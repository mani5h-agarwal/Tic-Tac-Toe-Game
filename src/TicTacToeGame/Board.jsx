import React, { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXTurn, setisXTurn] = useState(true);

  const playerX = "X";
  const playerO = "O";

  const handleClick = (index) => {
    if (state[index]) {
      return;
    }

    const copyState = [...state];
    copyState[index] = isXTurn ? playerX : playerO;
    setState(copyState);
    setisXTurn(!isXTurn);
  };

  const checkWinner = () => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (state[a] && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }

    if (state.every((square) => square !== null)) {
        return "Draw!";
    }
    return false;
  };

  const isWinner = checkWinner();

  const handleReset = () => {
    setState(Array(9).fill(null));
    setisXTurn(true);
  };

  return (
    <>
      {!isWinner &&(
        <div className="turn-display">
          <div className='X' style={{ fontWeight: isXTurn ? "bold" : "normal" }}>X Turn</div>
          <div className='O' style={{ fontWeight: isXTurn ? "normal" : "bold" }}>O Turn</div>
        </div>
      )}

      <div className="board-container">
        {(isWinner) ? (
          <>
          {(isWinner === "Draw!") ? (
              <h1>It's a Draw!</h1>
            ) : (
              <h1>{isWinner} is the winner!</h1>
            )
          }
            <button className="playAgain" onClick={handleReset}>
              <h2>Play Again</h2>
            </button>
          </>
        ) : (
          <>
            <h1>Tic Tac Toe</h1>
            <div className="board-row">
              <Square onClick={() => handleClick(0)} value={state[0]} />
              <Square onClick={() => handleClick(1)} value={state[1]} />
              <Square onClick={() => handleClick(2)} value={state[2]} />
            </div>
            <div className="board-row">
              <Square onClick={() => handleClick(3)} value={state[3]} />
              <Square onClick={() => handleClick(4)} value={state[4]} />
              <Square onClick={() => handleClick(5)} value={state[5]} />
            </div>
            <div className="board-row">
              <Square onClick={() => handleClick(6)} value={state[6]} />
              <Square onClick={() => handleClick(7)} value={state[7]} />
              <Square onClick={() => handleClick(8)} value={state[8]} />
            </div>
          </>
        )}
      </div>
    </>

  );
};
export default Board;
