import { Injectable, Logger } from '@nestjs/common';

type StoreItem = {
  response: string;
};

@Injectable()
export class CacheService {
  private cache: Map<string, StoreItem> = new Map<string, StoreItem>();

  grab(url: string) {
    return this.cache.get(url);
  }

  save(url: string, response: string): void {
    this.cache.set(url, { response });
  }

  remove(url: string): void {
    this.cache.delete(url);
  }

  exists(url: string): boolean {
    new Logger(CacheService.name).log(`Cache hit: ${url} exists`);
    return this.cache.has(url);
  }
}
