import { Injectable } from '@nestjs/common';

type WordInfo = {
  word: string;
  photo: string;
  wrongPhotos: string[];
};

const getUrlToPhoto = async (word: string) => {
  const API_KEY = '46773761-a14c40396ad70399c253b2016';
  const URL =
    'https://pixabay.com/api/?key=' +
    API_KEY +
    '&q=' +
    encodeURIComponent(word) +
    '&orientation=vertical';

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
    const randomSentences = new Map<number, WordInfo>();

    const randomEnglishWords = [
      'entertain',
      'sodomize',
      'afterglow',
      'serendipity',
      'normalize',
      'stoic',
      'impure',
      'rejoiced',
      'feelings',
      'hangover',
    ];
    const chosenRandomWord =
      randomEnglishWords[Math.floor(Math.random() * randomEnglishWords.length)];
    const url = await getUrlToPhoto(chosenRandomWord);
    const notChosenWords = randomEnglishWords
      .filter((word) => word !== chosenRandomWord)
      .sort(() => Math.random() - 0.5);

    const firstWrongPhoto = await getUrlToPhoto(notChosenWords.at(0) as string);
    const secondWrongPhoto = await getUrlToPhoto(
      notChosenWords.at(1) as string,
    );
    const thirdWrongPhoto = await getUrlToPhoto(notChosenWords.at(2) as string);
    randomSentences.set(0, {
      word: chosenRandomWord,
      photo: url,
      wrongPhotos: [firstWrongPhoto, secondWrongPhoto, thirdWrongPhoto],
    });

    // return random sentence from map
    const countOfMap = randomSentences.size;
    const randomIndex = Math.floor(Math.random() * countOfMap);

    return randomSentences.get(randomIndex);
  }
}
