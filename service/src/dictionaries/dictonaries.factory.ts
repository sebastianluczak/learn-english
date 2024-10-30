import { animalsDictionary } from './animals.dictionary';
import { foodDictionary } from './food.dictionary';

export type SupportedCategories = 'animals' | 'food';

export type Dictionary = {
  entries: string[];
};

export class DictionariesFactory {
  createForCategory(category: SupportedCategories) {
    switch (category) {
      case 'animals':
        return animalsDictionary;
      case 'food':
        return foodDictionary;
      default:
        throw new Error('Unsupported category.');
    }
  }
}
