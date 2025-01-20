import { NextRequest, NextResponse } from 'next/server';
import { imageExistsInCache, cacheImage } from '@/lib/serverImageCache';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const imageUrl = request.nextUrl.searchParams.get('url');

    console.log('Image request:', {
      url: imageUrl,
      isVercel: !!process.env.VERCEL,
      nodeEnv: process.env.NODE_ENV
    });

    if (!imageUrl) {
      throw new Error('Missing URL parameter');
    }

    // Validate URL
    let validatedUrl: URL;
    try {
      validatedUrl = new URL(imageUrl);
      if (!validatedUrl.protocol.startsWith('http')) {
        throw new Error('Invalid protocol');
      }
    } catch {
      throw new Error('Invalid URL format');
    }

    if (process.env.VERCEL) {
      const response = await fetch(validatedUrl.toString(), {
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
          'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
          'Access-Control-Allow-Origin': '*',
          'X-Content-Type-Options': 'nosniff',
          'Vary': 'Accept'
        }
      });
    }

    // Local development: Use file cache
    let imagePath = imageExistsInCache(validatedUrl.toString());
    
    if (!imagePath) {
      imagePath = await cacheImage(validatedUrl.toString());
    }

    const imageBuffer = fs.readFileSync(imagePath);
    
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
        'Content-Length': imageBuffer.length.toString(),
        'Access-Control-Allow-Origin': '*',
        'X-Content-Type-Options': 'nosniff',
        'Vary': 'Accept'
      }
    });

  } catch (error) {
    console.error('Image serving error:', error);
    
    // Return default image for 400/500 errors
    try {
      const defaultImagePath = path.join(process.cwd(), 'public', 'images', 'default-car.jpg');
      const defaultImageBuffer = fs.readFileSync(defaultImagePath);
      
      return new NextResponse(defaultImageBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=604800',
          'Content-Length': defaultImageBuffer.length.toString(),
          'X-Content-Type-Options': 'nosniff'
        },
      });
    } catch {
      return new NextResponse('Error serving image', { 
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
}
