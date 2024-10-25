import React from "react";

const DifficultySelector = ({ setDifficulty }) => {
  const handleDifficultyChange = (level) => {
    setDifficulty(level); // Update the difficulty in App.js
  };

  return (
    <div>
      <button onClick={() => handleDifficultyChange("easy")}>Easy</button>
      <button onClick={() => handleDifficultyChange("normal")}>Normal</button>
      <button onClick={() => handleDifficultyChange("hard")}>Hard</button>
    </div>
  );
};

export default DifficultySelector;
