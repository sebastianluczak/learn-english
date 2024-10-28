import { Injectable } from '@nestjs/common';

const getUrlToPhoto = async (word: string) => {
  const API_KEY = 'KEY_HERE_FOR_PIXABAP';
  const URL = 'https://pixabay.com/api/?key=' + API_KEY + '&q=' + encodeURIComponent(word) + '&orientation=vertical';

  const results = await fetch(URL);
  if (results.ok) {
    const resultsJson = await results.json();
    return resultsJson.hits.at(0).webformatURL as string;
  }

  return '';
};

@Injectable()
export class AppService {
  async getRandomWord() {
    const randomEnglishWords = ['lost', 'found', 'submissive', 'aggressive'];
    const chosenRandomWord = randomEnglishWords[Math.floor(Math.random() * randomEnglishWords.length)];
    const url = await getUrlToPhoto(chosenRandomWord);
    const notChosenWords = randomEnglishWords
      .filter((word) => word !== chosenRandomWord)
      .sort(() => Math.random() - 0.5);

    const firstWrongPhoto = await getUrlToPhoto(notChosenWords.at(0) as string);
    const secondWrongPhoto = await getUrlToPhoto(notChosenWords.at(1) as string);
    const thirdWrongPhoto = await getUrlToPhoto(notChosenWords.at(2) as string);
    return {
      word: chosenRandomWord,
      photo: url,
      wrongPhotos: [firstWrongPhoto, secondWrongPhoto, thirdWrongPhoto],
    };
  }
}
