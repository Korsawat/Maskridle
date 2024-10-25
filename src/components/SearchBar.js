import React, { useState } from "react";

const SearchBar = ({ characters, handleGuess, guesses }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter characters to exclude already guessed ones
  const filteredCharacters = characters.filter(
    (char) => !guesses.some((guess) => guess.Character === char.Character)
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true); // Show dropdown when typing
  };

  const handleCharacterSelect = (characterName) => {
    handleGuess(characterName);
    setSearchTerm(""); // Clear the search term
    setShowDropdown(false); // Hide dropdown after selection
  };

  const filteredDropdownOptions = filteredCharacters.filter((char) =>
    char.Character.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search Mask Rider"
      />
      {showDropdown && searchTerm && (
        <div className="dropdown">
          {filteredDropdownOptions.length > 0 ? (
            filteredDropdownOptions.map((char) => (
              <div
                key={char.Character}
                onClick={() => handleCharacterSelect(char.Character)}
                className="dropdown-item"
              >
                {char.Character}
              </div>
            ))
          ) : (
            <div className="dropdown-item">No results</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
