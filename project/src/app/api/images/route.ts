import { NextRequest, NextResponse } from 'next/server';
import { cacheImage } from '@/lib/imageCache';
import { getCachePaths, isCacheValid } from '@/lib/imageCache';
import fs from 'fs/promises';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const rawUrl = request.nextUrl.searchParams.get('url');
    
    console.log('Image proxy request:', {
      rawUrl,
      isVercel: !!process.env.VERCEL,
      nodeEnv: process.env.NODE_ENV
    });

    if (!rawUrl) {
      throw new Error('Missing URL parameter');
    }

    const decodedUrl = decodeURIComponent(rawUrl);
    if (!decodedUrl.startsWith('http')) {
      throw new Error('Invalid URL protocol');
    }

    // Use caching system when not on Vercel
    if (!process.env.VERCEL) {
      const { imagePath } = getCachePaths(decodedUrl);
      
      if (await isCacheValid(imagePath)) {
        const imageBuffer = await fs.readFile(imagePath);
        return new NextResponse(imageBuffer, {
          status: 200,
          headers: {
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'public, max-age=604800',
            'Access-Control-Allow-Origin': '*',
            'X-Content-Type-Options': 'nosniff'
          }
        });
      }

      // Cache miss or invalid cache - cache the image
      const cachedPath = await cacheImage(decodedUrl);
      const imageBuffer = await fs.readFile(cachedPath);
      return new NextResponse(imageBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=604800',
          'Access-Control-Allow-Origin': '*',
          'X-Content-Type-Options': 'nosniff'
        }
      });
    }

    // On Vercel - direct fetch
    const response = await fetch(decodedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });

    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }

    return new NextResponse(response.body, {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=604800',
        'Access-Control-Allow-Origin': '*',
        'X-Content-Type-Options': 'nosniff'
      }
    });

  } catch (error) {
    console.error('Image proxy error:', error);
    return new NextResponse('Error fetching image', { 
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
