import React from 'react';

const AnswerBox = ({ chosenCharacter, guesses = [], difficulty }) => {
  if (!chosenCharacter || guesses.length === 0) return null;

  const getComparisonStyle = (chosen, guess, field) => {
    if (field === 'Rider type' || field === 'Species') {
      const chosenField = (chosen[field] || "").split(', ').map(item => item.trim());
      const guessField = (guess[field] || "").split(', ').map(item => item.trim());

      const chosenSet = new Set(chosenField);
      const guessSet = new Set(guessField);

      const intersection = new Set([...guessSet].filter(item => chosenSet.has(item)));

      if (intersection.size === chosenSet.size && intersection.size === guessSet.size) {
        return { className: 'correct', style: { backgroundColor: '#a5d6a7' } }; // Exact match: green
      } else if (intersection.size > 0) {
        return { className: 'partial', style: { backgroundColor: '#fff176' } }; // Partial match: yellow
      } else {
        return { className: 'incorrect', style: { backgroundColor: '#ef9a9a' } }; // No match: red
      }
    } else if (['Ep', 'Form', 'Release'].includes(field)) {
      const chosenValue = parseInt(chosen[field], 10);
      const guessValue = parseInt(guess[field], 10);

      if (isNaN(guessValue) || isNaN(chosenValue)) return { className: 'incorrect', style: { backgroundColor: '#ef9a9a' } };

      if (guessValue === chosenValue) {
        return { className: 'correct', style: { backgroundColor: '#a5d6a7' } };
      } else if (guessValue < chosenValue) {
        return { className: 'higher', style: { backgroundColor: '#ffcdd2' } };
      } else {
        return { className: 'lower', style: { backgroundColor: '#ffcdd2' } };
      }
    } else {
      return guess[field] === chosen[field]
        ? { className: 'correct', style: { backgroundColor: '#a5d6a7' } }
        : { className: 'incorrect', style: { backgroundColor: '#ef9a9a' } };
    }
  };

  return (
    <div className="answer-box">
      <h2>Guess History</h2>
      <table>
        <thead>
          <tr>
            <th>Character</th>
            <th>Gender</th>
            <th>Rider Type</th>
            <th>Eyes Color</th>
            <th>Species</th>
            <th>Affiliation</th>
            <th>First Appear</th>
            <th>Episode</th>
            <th>Form</th>
            <th>Era</th>
            {difficulty === 'easy' && <th>Release</th>}
          </tr>
        </thead>
        <tbody>
          {guesses.map((guess, index) => (
            <tr key={index}>
              <td {...getComparisonStyle(chosenCharacter, guess, 'Character')}>{guess.Character}</td>
              <td {...getComparisonStyle(chosenCharacter, guess, 'Gender')}>{guess.Gender}</td>
              <td {...getComparisonStyle(chosenCharacter, guess, 'Rider type')}>{guess["Rider type"]}</td>
              <td {...getComparisonStyle(chosenCharacter, guess, 'Eyes colors')}>{guess["Eyes colors"]}</td>
              <td {...getComparisonStyle(chosenCharacter, guess, 'Species')}>{guess.Species}</td>
              <td {...getComparisonStyle(chosenCharacter, guess, 'Affiliation')}>{guess.Affiliation}</td>
              <td {...getComparisonStyle(chosenCharacter, guess, 'First appear')}>{guess["First appear"]}</td>
              <td {...getComparisonStyle(chosenCharacter, guess, 'Ep')}>
                {guess.Ep}{getComparisonStyle(chosenCharacter, guess, 'Ep').className === 'higher' ? '⬇️' : getComparisonStyle(chosenCharacter, guess, 'Ep').className === 'lower' ? '⬆️' : ''}
              </td>
              <td {...getComparisonStyle(chosenCharacter, guess, 'Form')}>
                {guess.Form}{getComparisonStyle(chosenCharacter, guess, 'Form').className === 'higher' ? '⬇️' : getComparisonStyle(chosenCharacter, guess, 'Form').className === 'lower' ? '⬆️' : ''}
              </td>
              <td {...getComparisonStyle(chosenCharacter, guess, 'Era')}>{guess.Era}</td>
              {difficulty === 'easy' && (
                <td {...getComparisonStyle(chosenCharacter, guess, 'Release')}>
                  {guess.Release}{getComparisonStyle(chosenCharacter, guess, 'Release').className === 'higher' ? '⬇️' : getComparisonStyle(chosenCharacter, guess, 'Release').className === 'lower' ? '⬆️' : ''}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnswerBox;
