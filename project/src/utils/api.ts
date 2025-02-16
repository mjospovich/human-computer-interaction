export async function scrapeCarData(url: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SCRAPER_BASE_URL;
  const njuskaloPort = process.env.NEXT_PUBLIC_NJUSKALO_PORT;
  const indexPort = process.env.NEXT_PUBLIC_INDEX_PORT;
  
  const port = url.includes('index.hr') ? indexPort : njuskaloPort;
  
  const response = await fetch(`${baseUrl}:${port}/scrape`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url,
      headless: true,
      timeout: 10000
    })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch car data');
  }

  return response.json();
}
