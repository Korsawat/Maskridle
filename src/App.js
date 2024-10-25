import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import maskRiderData from "./maskrider.csv";
import DifficultySelector from "./components/DifficultySelector";
import SearchBar from "./components/SearchBar";
import AnswerBox from "./components/AnswerBox";
import GameControls from "./components/GameControls";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [chosenCharacter, setChosenCharacter] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [difficulty, setDifficulty] = useState("normal"); // Start with "Normal"
  const [guesses, setGuesses] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [remainingGuesses, setRemainingGuesses] = useState(12); // Default for "normal"

  useEffect(() => {
    // Load Mask Rider data from CSV
    Papa.parse(maskRiderData, {
      download: true,
      header: true,
      complete: (result) => {
        setCharacters(result.data); // Load character data
      },
    });
  }, []);

  useEffect(() => {
    // Start the game once characters are loaded and difficulty is set
    if (characters.length > 0) {
      startGame(difficulty); // Start with the chosen difficulty
    }
  }, [characters, difficulty]);

  const startGame = (difficultyLevel) => {
    const randomCharacter =
      characters[Math.floor(Math.random() * characters.length)];
    setChosenCharacter(randomCharacter);
    console.log("Starting game with character:", randomCharacter);
    setGuesses([]);
    setGameWon(false);

    // Set initial guesses based on difficulty level
    if (difficultyLevel === "easy") {
      setRemainingGuesses(Infinity);
    } else if (difficultyLevel === "normal") {
      setRemainingGuesses(12);
    } else if (difficultyLevel === "hard") {
      setRemainingGuesses(6);
    }
  };

  const handleGuess = (guessName) => {
    if (gameWon || remainingGuesses === 0) return; // Stop if game is won or no guesses left

    const guessedCharacter = characters.find(
      (char) => char.Character === guessName
    );
    setSelectedCharacter(guessedCharacter);
    setGuesses([...guesses, guessedCharacter]);

    // Check if the guessed character is the chosen character
    if (guessedCharacter.Character === chosenCharacter.Character) {
      setGameWon(true);
      alert(
        `Congratulations! You guessed correctly. The character is ${guessedCharacter.Character}.`
      );
      resetGame();
    } else if (difficulty !== "easy") {
      // Reduce remaining guesses for "normal" and "hard" difficulties
      setRemainingGuesses((prev) => prev - 1);

      // Check if guesses are exhausted and trigger Game Over
      if (remainingGuesses === 1) {
        alert(`Game Over! The correct answer was ${chosenCharacter.Character}`);
        resetGame();
      }
    }
  };

  const resetGame = () => {
    startGame(difficulty); // Restart with the current difficulty
    setSelectedCharacter(null);
  };

  const giveUp = () => {
    alert(`The correct answer was ${chosenCharacter?.Character}`);
    resetGame();
  };

  return (
    <div className="App">
      <h1>MASK RIDLE</h1>
      <DifficultySelector setDifficulty={setDifficulty} />

      <div className="guess-info">
        <p>
          Guesses Left: {remainingGuesses === Infinity ? "∞" : remainingGuesses}
        </p>
      </div>

      <SearchBar
        characters={characters}
        handleGuess={handleGuess}
        guesses={guesses}
      />
      <AnswerBox
        chosenCharacter={chosenCharacter}
        guesses={guesses}
        difficulty={difficulty}
      />
      <GameControls giveUp={giveUp} resetGame={resetGame} />
    </div>
  );
};

export default App;
