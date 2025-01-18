import { NextRequest, NextResponse } from 'next/server';
import { imageExistsInCache, cacheImage } from '@/lib/serverImageCache';
import fs from 'fs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
      return new NextResponse('Missing URL parameter', { status: 400 });
    }

    let imagePath: string;

    const cachedImagePath = imageExistsInCache(imageUrl);
    if (typeof cachedImagePath === 'string') {
      imagePath = cachedImagePath;
    } else {
      imagePath = await cacheImage(imageUrl);
    }

    const imageBuffer = fs.readFileSync(imagePath);
    
    const headers = new Headers({
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
      'Content-Length': imageBuffer.length.toString(),
    });

    return new NextResponse(imageBuffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Image serving error:', error);
    return new NextResponse('Error serving image', { status: 500 });
  }
}
