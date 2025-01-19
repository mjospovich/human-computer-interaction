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
  const { imagePath, metaPath } = getCachePaths(url);
  
  // Check cache and expiry
  if (await isCacheValid(imagePath)) {
    return imagePath;
  }

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

    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > config.maxFileSize) {
      throw new Error('File too large');
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

// Setup cleanup interval
const cleanup = async () => {
  try {
    const cacheDir = path.join(process.cwd(), CACHE_DIR);
    const files = await fs.readdir(cacheDir);
    
    for (const file of files) {
      if (!file.endsWith('.meta')) continue;
      const imagePath = path.join(cacheDir, file.replace('.meta', ''));
      if (!(await isCacheValid(imagePath))) {
        await Promise.all([
          fs.unlink(imagePath).catch(() => {}),
          fs.unlink(`${imagePath}.meta`).catch(() => {})
        ]);
      }
    }
  } catch (error) {
    console.error('Cleanup error:', error);
  }
};

if (process.env.NODE_ENV === 'production') {
  setInterval(cleanup, config.cleanupInterval);
}

export { getCachePaths, isCacheValid };
