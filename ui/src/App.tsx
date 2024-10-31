import {useEffect, useState} from 'react';
import './App.css';

type JsonResponse = {
  photo: string;
  word: string;
  wrongPhotos: string[];
};

const categories = ['food', 'animals'];

function App() {
  const [currentCategory, setCurrentCategory] = useState<string>('food');
  const [wordToGuess, setData] = useState<string | undefined>();
  const [photoToGuess, setPhoto] = useState<string | undefined>();
  const [wrongPhotos, setWrongPhotos] = useState<string[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [readTheDocs, setReadTheDocs] = useState<string>("");

  const fetchDataFromBackend = async () => {
    setReadTheDocs("");
    setData("Losuję nowy wyraz...");
    setWrongPhotos([]);

    const response = await fetch(`http://localhost:8080/words/get?category=${currentCategory}`);
    console.log(`After response of ${currentCategory}`);
    if (response.ok) {
      const json = await response.json() as JsonResponse;

      setData(json.word);
      setPhoto(json.photo);
      setWrongPhotos(json.wrongPhotos);

      const allPhotos = [json.photo, ...json.wrongPhotos];
      const shuffledPhotos = allPhotos.sort(() => Math.random() - 0.5);
      setWrongPhotos(shuffledPhotos);
      setSelectedPhoto(null);
      setIsCorrect(null);
    }
  };

  const handlePhotoClick = (photo: string) => {
    if (selectedPhoto === photo) {
      setReadTheDocs("Nie możesz zaznaczyć dwa razy tej samej odpowiedzi...");
      return;
    }
    setSelectedPhoto(photo);
    const correct = photo === photoToGuess;
    setIsCorrect(correct);

    if (correct) {
      setReadTheDocs("😊 Brawo! To prawidłowa odpowiedź!");
      setCorrectGuesses(prev => prev + 1);
    } else {
      setReadTheDocs("🥺 Pudło! Spróbuj ponownie lub przejdź do następnej zagadki.");
      setIncorrectGuesses(prev => prev + 1);
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCategory(event.target.value);
    setReadTheDocs(`Zmieniono kategorię na: ${event.target.value}`);
  };

  useEffect(() => {
    fetchDataFromBackend();
  }, [currentCategory]);

  return (
    <>
      <div className="navbar">
        <span className="emphasized correct">Prawidowo: {correctGuesses}</span> <span>| </span>
        <span className="emphasized incorrect">Nieprawidłowo: {incorrectGuesses}</span>
      </div>
      <h1>🧑‍🏫 Learn English</h1>
      <h2>Ucz się języka angielskiego</h2>

      <div className="main-container">
        <div className="left-column">
          <div className="category-selector">
            <label htmlFor="category">Wybierz kategorię:</label>
            <select id="category" value={currentCategory} onChange={handleCategoryChange}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <button onClick={fetchDataFromBackend}>
            <h2>Zgadnij nowy wyraz w języku angielskim</h2>
          </button>

          <p className="read-the-docs">
            <h2>{readTheDocs}</h2>
          </p>
        </div>

        <div className="right-column">
          <div className={"guess-word"}>{wordToGuess?.toUpperCase()}</div>
          <div className="grid">
            {wrongPhotos.map((photo, index) => (
              <button
                key={index}
                className={`grid-item ${selectedPhoto === photo ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                onClick={() => handlePhotoClick(photo)}
              >
                <img src={photo} alt={`Guess ${index}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
