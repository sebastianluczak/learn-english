import { useState } from 'react';
import './App.css';

type JsonResponse = {
  photo: string;
  word: string;
  wrongPhotos: string[];
};

function App() {
  const [wordToGuess, setData] = useState<string | undefined>();
  const [photoToGuess, setPhoto] = useState<string | undefined>();
  const [wrongPhotos, setWrongPhotos] = useState<string[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);

  const fetchDataFromBackend = async () => {
    setData("Losuję nowy wyraz...");
    const response = await fetch('http://localhost:8080/words/get');
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
    setSelectedPhoto(photo);
    const correct = photo === photoToGuess;
    setIsCorrect(correct);

    if (correct) {
      setCorrectGuesses(prev => prev + 1);
    } else {
      setIncorrectGuesses(prev => prev + 1);
    }
  };

  return (
    <>
      <div className="navbar">
        <span>Prawidowo: {correctGuesses}</span> <span>| </span>
        <span>Nieprawidłowo: {incorrectGuesses}</span>
      </div>
      <div>
        <a href="#" target="_blank">
          {/* SVG logo here */}
        </a>
      </div>
      <h1>Learn English</h1>
      <div className="card">
        <button onClick={fetchDataFromBackend}>
          <h2>Nowa zagadka</h2>
        </button>
        <h2>{wordToGuess?.toUpperCase()}</h2>

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
      <p className="read-the-docs"></p>
    </>
  );
}

export default App;
