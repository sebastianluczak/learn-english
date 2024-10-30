import { Injectable } from '@nestjs/common';
import { ImagesProvider } from './images/images.provider';
import { DictionariesFactory, SupportedCategories } from './dictionaries/dictonaries.factory';

@Injectable()
export class AppService {
  constructor(private readonly imagesProvider: ImagesProvider) {}

  async getRandomWord(category: SupportedCategories = 'food') {
    const randomEnglishWords = new DictionariesFactory().createForCategory(category).entries;
    const chosenRandomWord = randomEnglishWords[Math.floor(Math.random() * randomEnglishWords.length)];
    console.log(chosenRandomWord);
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
