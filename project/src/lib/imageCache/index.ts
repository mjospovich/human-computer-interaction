import { promises as fs } from 'fs';
import path from 'path';
import { config, CACHE_DIR } from './config';
import { getCachePaths, isCacheValid, setMetadata } from './utils';
import type { CacheMetadata } from './types';

// Ensure cache directory exists
(async () => {
  try {
    await fs.mkdir(path.join(process.cwd(), CACHE_DIR), { recursive: true });
  } catch (error) {
    console.error('Failed to create cache directory:', error);
  }
})();

export async function cacheImage(url: string): Promise<string> {
  const { imagePath } = getCachePaths(url);
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.fetchTimeout);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    await fs.writeFile(imagePath, Buffer.from(buffer));

    const metadata: CacheMetadata = {
      cached: Date.now(),
      size: buffer.byteLength,
      originalUrl: url,
      mimeType: response.headers.get('content-type') || 'image/jpeg'
    };

    await setMetadata(imagePath, metadata);
    return imagePath;
  } catch (error) {
    console.error('Cache error:', error);
    throw error;
  }
}

export { getCachePaths, isCacheValid };
