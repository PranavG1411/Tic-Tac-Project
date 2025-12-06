import "./App.css";
import { useState } from "react";
import Player from "./Components/Player.jsx";
import GameBoard from "./Components/GameBoard.jsx";
import Log from "./Components/Log.jsx";
import { WINNING_COMBINATIONS } from "./Components/WINNING_COMBINATIONS.js";
import GameOver from "./Components/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurn: string | any[]) {
  let currentPlayer = "X";

  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [player, setplayer] = useState({
    X: "Player1",
    O: "Player 2",
  });
  const [gameTurn, setGameTurns] = useState([]); // keeps the game turn
  // const [activePlayer, setActivePlayer] = useState("X"); //  keeps the active player

  const activePlayer = derivedActivePlayer(gameTurn);

  const gameboard = initialGameBoard.map((row) => [...row]);

  // fill in the moves based on turns
  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;

    gameboard[row][col] = player;
  }
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameboard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameboard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameboard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = player[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurn.length === 9 && !winner;

  function handleSelectSquare(rowIndex: any, colIndex: any) {
    // Toggle between X and O
    // setActivePlayer((currentActivePlayer) =>
    //   currentActivePlayer === "X" ? "O" : "X"
    // );

    // Update game turns
    setGameTurns((prevTurn) => {
      const currentPlayer = derivedActivePlayer(prevTurn);
      const updateTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];

      return updateTurn; // ✅ return new array
    });
  }
  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setplayer((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            playername="Player1"
            symbol="X"
            isActive={activePlayer === "X"}
            OnChangeName={handlePlayerNameChange}
          />
          <Player
            playername="Player2"
            symbol="O"
            isActive={activePlayer === "O"}
            OnChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        {/* ✅ Fixed line below */}
        <GameBoard onSelectSquare={handleSelectSquare} borad={gameboard} />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
