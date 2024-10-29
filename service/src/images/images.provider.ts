import { Injectable } from '@nestjs/common';
import { CacheService } from './cache.service';

@Injectable()
export class ImagesProvider {
  private readonly apiKey = 'YOUR_KEY_HERE';
  private readonly apiHost = 'https://pixabay.com/api/';

  constructor(private readonly cache: CacheService) {}

  async getUrlToPhoto(word: string) {
    if (this.cache.exists(word)) {
      return this.cache.grab(word);
    }

    const URL = this.apiHost + '?key=' + this.apiKey + '&q=' + encodeURIComponent(word) + '&orientation=vertical';

    const results = await fetch(URL);
    if (results.ok) {
      const resultsJson = await results.json();
      if (resultsJson.hits.length > 0) {
        const imageUrl = resultsJson.hits.at(0).webformatURL as string;
        this.cache.save(word, imageUrl);

        return imageUrl;
      }

      return '';
    }

    return '';
  }
}
