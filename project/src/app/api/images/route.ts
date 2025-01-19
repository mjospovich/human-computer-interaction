import { NextRequest, NextResponse } from 'next/server';
import { imageExistsInCache, cacheImage } from '@/lib/serverImageCache';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
      return new NextResponse('Missing URL parameter', { status: 400 });
    }

    //console.log('Processing image request for:', imageUrl);

    // Check cache first
    const cachedPath = imageExistsInCache(imageUrl);
    let imagePath: string;

    if (cachedPath) {
      //console.log('Found in cache:', cachedPath);
      imagePath = cachedPath;
    } else {
      //console.log('Caching new image:', imageUrl);
      imagePath = await cacheImage(imageUrl);
    }

    const imageBuffer = fs.readFileSync(imagePath);
    
    const headers = new Headers({
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
      'Content-Length': imageBuffer.length.toString(),
      'Access-Control-Allow-Origin': '*',
    });

    return new NextResponse(imageBuffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Image serving error:', error);
    
    // Return default image on error
    try {
      const defaultImagePath = path.join(process.cwd(), 'public', 'images', 'default-car.jpg');
      const defaultImageBuffer = fs.readFileSync(defaultImagePath);
      
      return new NextResponse(defaultImageBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=604800',
        },
      });
    } catch {
      return new NextResponse('Error serving image', { status: 500 });
    }
  }
}
