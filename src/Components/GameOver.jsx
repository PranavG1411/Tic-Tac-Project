export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over!!!</h2>
      {winner && <p>You Won {winner}!!</p>}
      {!winner && <p>Match is Draw!! </p>}
      <button onClick={onRestart}>Rematch!!</button>
    </div>
  );
}
