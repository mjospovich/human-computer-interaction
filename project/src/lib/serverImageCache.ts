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

export function imageExistsInCache(url: string): boolean {
  const imagePath = getCachedImagePath(url);
  return fs.existsSync(imagePath);
}

export async function cacheImage(url: string): Promise<string> {
  const imagePath = getCachedImagePath(url);
  
  if (imageExistsInCache(url)) {
    return imagePath;
  }

  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(imagePath, Buffer.from(buffer));
    return imagePath;
  } catch (error) {
    console.error('Error caching image:', error);
    throw error;
  }
}
