import { NextRequest, NextResponse } from 'next/server';
import { imageExistsInCache, cacheImage } from '@/lib/serverImageCache';
import fs from 'fs';
import path from 'path';

// Add route segment config
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
      throw new Error('Missing URL parameter');
    }

    // Validate URL
    try {
      new URL(imageUrl);
    } catch {
      throw new Error('Invalid URL');
    }

    // Check cache first
    const cachedPath = imageExistsInCache(imageUrl);
    let imagePath: string;

    if (cachedPath) {
      imagePath = cachedPath;
    } else {
      imagePath = await cacheImage(imageUrl);
    }

    const imageBuffer = fs.readFileSync(imagePath);
    
    // Improve headers
    const headers = new Headers({
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
      'Content-Length': imageBuffer.length.toString(),
      'Access-Control-Allow-Origin': '*',
      'X-Content-Type-Options': 'nosniff',
      'Vary': 'Accept'
    });

    return new NextResponse(imageBuffer, { status: 200, headers });

  } catch (error) {
    console.error('Image serving error:', error);
    
    // Return default image with proper headers
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
