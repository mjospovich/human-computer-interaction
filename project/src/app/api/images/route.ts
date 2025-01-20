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
      nodeEnv: process.env.NODE_ENV,
      headers: Object.fromEntries(request.headers)
    });

    if (!rawUrl) {
      throw new Error('Missing URL parameter');
    }

    const decodedUrl = decodeURIComponent(rawUrl);
    if (!decodedUrl.startsWith('http')) {
      throw new Error('Invalid URL protocol');
    }

    // Common response headers
    const commonHeaders = {
      'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
      'X-Content-Type-Options': 'nosniff',
      'Vary': 'Accept'
    };

    // Check If-None-Match header
    const ifNoneMatch = request.headers.get('if-none-match');
    const etag = `"${Buffer.from(decodedUrl).toString('base64')}"`;

    if (ifNoneMatch === etag) {
      return new NextResponse(null, {
        status: 304,
        headers: commonHeaders
      });
    }

    let response;
    if (process.env.VERCEL) {
      response = await fetch(decodedUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Accept': 'image/webp,image/jpeg,*/*'
        }
      });

      if (!response.ok) {
        throw new Error(`Fetch failed: ${response.status}`);
      }

      return new NextResponse(response.body, {
        status: 200,
        headers: {
          ...commonHeaders,
          'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
          'ETag': etag
        }
      });
    }

    // Local development: Use file cache
    const { imagePath } = getCachePaths(decodedUrl);
    let imageBuffer;
    
    if (await isCacheValid(imagePath)) {
      imageBuffer = await fs.readFile(imagePath);
    } else {
      const cachedPath = await cacheImage(decodedUrl);
      imageBuffer = await fs.readFile(cachedPath);
    }

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        ...commonHeaders,
        'Content-Type': 'image/webp',
        'Content-Length': imageBuffer.length.toString(),
        'ETag': etag
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
