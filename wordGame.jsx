import React, { useState, useEffect } from "react";
import "./WordGame.css"; // Create a CSS file for styling

const wordList = [
  { word: "python", hint: "programming language" },
  { word: "guitar", hint: "a musical instrument" },
  { word: "aim", hint: "a purpose or intention" },
  { word: "venus", hint: "planet of our solar system" },
  { word: "gold", hint: "a yellow precious metal" },
  // Add the rest of the words from your list here...
];

const WordGame = () => {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(3);
  const [wordIndex, setWordIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState(wordList[0].word);
  const [selectedHint, setSelectedHint] = useState(wordList[0].hint);
  const [inputLetters, setInputLetters] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    let timer;
    if (time > 0) {
      timer = setTimeout(() => setTime(time - 1), 1000);
    } else {
      setGameOver(true);
    }
    return () => clearTimeout(timer);
  }, [time]);

  useEffect(() => {
    setSelectedWord(wordList[wordIndex].word);
    setSelectedHint(wordList[wordIndex].hint);
    setInputLetters(Array(wordList[wordIndex].word.length).fill(""));
    setTime(3);
    setGameOver(false);
  }, [wordIndex]);

  const handleLetterClick = (letter) => {
    if (gameOver) return;

    const updatedInputLetters = [...inputLetters];
    let correctGuess = false;

    selectedWord.split("").forEach((char, index) => {
      if (char === letter) {
        updatedInputLetters[index] = letter;
        correctGuess = true;
      }
    });

    setInputLetters(updatedInputLetters);
    setScore(score + (correctGuess ? 10 : -10));

    if (updatedInputLetters.join("") === selectedWord) {
      setTimeout(() => setWordIndex(wordIndex + 1), 1000);
    }
  };

  const handleNextWord = () => {
    if (wordIndex < wordList.length - 1) {
      setWordIndex(wordIndex + 1);
    } else {
      alert("You've completed all words!");
    }
  };

  return (
    <div className="word-game">
      <div className="header">
        <h1>Word Game</h1>
        <p>Score: {score}</p>
        <p className={`timer ${time === 0 ? "time-up" : ""}`}>Time: {time}</p>
      </div>

      <div className="game-area">
        <div className="word-boxes">
          {inputLetters.map((letter, index) => (
            <div key={index} className="mini-box">
              {letter}
            </div>
          ))}
        </div>

        {showHint && <div className="hint-box">Hint: {selectedHint}</div>}

        <div className="keyboard">
          {"abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
            <button
              key={letter}
              className="key"
              onClick={() => handleLetterClick(letter)}
              disabled={inputLetters.includes(letter)}
            >
              {letter}
            </button>
          ))}
        </div>

        <button onClick={() => setShowHint(!showHint)} className="hint-button">
          Show Hint
        </button>

        <button onClick={handleNextWord} className="next-word-button">
          Next Word
        </button>
      </div>

      {gameOver && <div className="game-over">Time is up!</div>}
    </div>
  );
};

export default WordGame;
