import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const CACHE_DIR = path.join(process.cwd(), 'images-cache');

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

export function getCacheKey(url: string): string {
  return crypto.createHash('md5').update(url).digest('hex');
}

export function getCachedImagePath(url: string): string {
  const hash = getCacheKey(url);
  return path.join(CACHE_DIR, `${hash}.jpg`);
}

export function imageExistsInCache(url: string): string | false {
  const imagePath = getCachedImagePath(url);
  return fs.existsSync(imagePath) ? imagePath : false;
}

export async function cacheImage(url: string): Promise<string> {
  const imagePath = getCachedImagePath(url);
  
  if (imageExistsInCache(url)) {
    return imagePath;
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(imagePath, Buffer.from(buffer));
    console.log(`Cached image: ${url} to ${imagePath}`);
    return imagePath;
  } catch (error) {
    console.error('Error caching image:', error, 'URL:', url);
    throw error;
  }
}
