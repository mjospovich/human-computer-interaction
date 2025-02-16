export async function scrapeCarData(url: string) {
  const response = await fetch('/api/scrape', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch car data');
  }

  return response.json();
}
