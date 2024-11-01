import { Injectable } from '@nestjs/common';
import { ImagesProvider } from './images/images.provider';
import { DictionariesFactory, SupportedCategories } from './dictionaries/dictonaries.factory';

@Injectable()
export class AppService {
  constructor(private readonly imagesProvider: ImagesProvider) {}

  async getRandomWord(category: SupportedCategories = 'food') {
    const randomEnglishWords = new DictionariesFactory().createForCategory(category).entries;
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

  generateEquations(count: number): string[] {
    const equations: string[] = [];

    while (equations.length < count) {
      const equation = this.createEquation();
      if (equation) {
        equations.push(equation);
      }
    }

    return equations;
  }

  private createEquation(): string | null {
    const num1 = this.getRandomInt(1, 99);
    const num2 = this.getRandomInt(1, 99);

    const operator1 = Math.random() > 0.5 ? '+' : '-';
    const leftSide = eval(`${num1} ${operator1} ${num2}`);

    if (Number.isInteger(leftSide) && leftSide >= 0 && leftSide <= 99) {
      const equation = `${num1}${operator1}${num2}=${leftSide}`;

      return equation.length === 8 ? equation : null;
    }

    return null;
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
