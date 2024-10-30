import { DictionariesFactory, SupportedCategories } from './dictonaries.factory';

describe('Dictionaries Factory', () => {
  let factory: DictionariesFactory;

  beforeEach(() => {
    factory = new DictionariesFactory();
  });

  it('should be defined', () => {
    expect(factory).toBeDefined();
  });

  it('should throw error on unsupported category', () => {
    expect(() => factory.createForCategory('unsupported' as unknown as SupportedCategories)).toThrow();
  });

  it('should return food dictionary', () => {
    const foodDictionary = factory.createForCategory('food');

    expect(foodDictionary.entries).toBeDefined();
    expect(foodDictionary.entries.at(0)).toEqual('peach');
  });

  it('should return animals dictionary', () => {
    const animalDictionary = factory.createForCategory('animals');

    expect(animalDictionary.entries).toBeDefined();
    expect(animalDictionary.entries.at(0)).toEqual('Aardvark');
  });
});
