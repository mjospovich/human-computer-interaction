import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    // Get the raw URL string first
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

    // Decode the URL if it's encoded
    const decodedUrl = decodeURIComponent(rawUrl);

    // Basic URL validation
    if (!decodedUrl.startsWith('http')) {
      throw new Error('Invalid URL protocol');
    }

    const response = await fetch(decodedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });

    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('Content-Type');
    
    return new NextResponse(response.body, {
      status: 200,
      headers: {
        'Content-Type': contentType || 'image/jpeg',
        'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
        'X-Content-Type-Options': 'nosniff',
        'Vary': 'Accept'
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
