export interface CacheMetadata {
  cached: number;
  size: number;
  originalUrl: string;
  mimeType: string;
}

export interface CacheConfig {
  maxFileSize: number;
  cacheExpiry: number;
  fetchTimeout: number;
  cleanupInterval: number;
}
