import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { CacheMetadata } from './types';
import { config, CACHE_DIR } from './config';

export function getCacheKey(url: string): string {
  return crypto.createHash('md5').update(url).digest('hex');
}

export function getCachePaths(url: string) {
  const hash = getCacheKey(url);
  const imagePath = path.join(process.cwd(), CACHE_DIR, `${hash}.bin`);
  const metaPath = `${imagePath}.meta`;
  return { imagePath, metaPath };
}

export async function isCacheValid(imagePath: string): Promise<boolean> {
  try {
    const meta = await getMetadata(imagePath);
    return Date.now() - meta.cached < config.cacheExpiry;
  } catch {
    return false;
  }
}

export async function getMetadata(imagePath: string): Promise<CacheMetadata> {
  const metaPath = `${imagePath}.meta`;
  const data = await fs.readFile(metaPath, 'utf-8');
  return JSON.parse(data);
}

export async function setMetadata(imagePath: string, meta: CacheMetadata): Promise<void> {
  const metaPath = `${imagePath}.meta`;
  await fs.writeFile(metaPath, JSON.stringify(meta));
}
