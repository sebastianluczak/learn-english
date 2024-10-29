import { Injectable } from '@nestjs/common';
import { dictionary } from './dictionary';
import { ImagesProvider } from './images/images.provider';

@Injectable()
export class AppService {
  constructor(private readonly imagesProvider: ImagesProvider) {}

  async getRandomWord() {
    const randomEnglishWords = dictionary();
    const chosenRandomWord = randomEnglishWords[Math.floor(Math.random() * randomEnglishWords.length)];
    const notChosenWords = randomEnglishWords
      .filter((word) => word !== chosenRandomWord)
      .sort(() => Math.random() - 0.5);

    const [url, firstWrongPhoto, secondWrongPhoto, thirdWrongPhoto] = await Promise.all([
      this.imagesProvider.getUrlToPhoto(chosenRandomWord),
      this.imagesProvider.getUrlToPhoto(notChosenWords.at(0) as string),
      this.imagesProvider.getUrlToPhoto(notChosenWords.at(1) as string),
      this.imagesProvider.getUrlToPhoto(notChosenWords.at(2) as string),
    ]);

    return {
      word: chosenRandomWord,
      photo: url,
      wrongPhotos: [firstWrongPhoto, secondWrongPhoto, thirdWrongPhoto],
    };
  }
}
