import React from 'react';

const GameControls = ({ giveUp, resetGame }) => (
  <div>
    <button onClick={giveUp}>Give Up</button>
    <button onClick={resetGame}>Reset</button>
  </div>
);

export default GameControls;
