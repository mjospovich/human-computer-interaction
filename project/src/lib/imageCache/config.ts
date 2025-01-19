import { CacheConfig } from './types';

export const config: CacheConfig = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  cacheExpiry: 7 * 24 * 60 * 60 * 1000, // 7 days
  fetchTimeout: 5000, // 5 seconds
  cleanupInterval: 24 * 60 * 60 * 1000 // 24 hours
};

export const CACHE_DIR = process.env.IMAGE_CACHE_DIR || 'images-cache';
