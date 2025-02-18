import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { url } = body

  // Ensure we have the environment variables
  const baseUrl = process.env.NEXT_PUBLIC_SCRAPER_BASE_URL;
  const njuskaloPort = process.env.NEXT_PUBLIC_NJUSKALO_PORT;
  const indexPort = process.env.NEXT_PUBLIC_INDEX_PORT;

  if (!baseUrl || !njuskaloPort || !indexPort) {
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  try {
    // Always use http for the scraper
    const scrapingUrl = `http://${baseUrl.replace('https://', '').replace('http://', '')}:${url.includes('index.hr') ? indexPort : njuskaloPort}/scrape`;
    
    console.log('Calling scraper at:', scrapingUrl);

    const response = await fetch(scrapingUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url,
        headless: true,
        timeout: 20000
      })
    });

    if (!response.ok) {
      throw new Error(`Scraper responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Scraping error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch car data' },
      { status: 500 }
    );
  }
}
