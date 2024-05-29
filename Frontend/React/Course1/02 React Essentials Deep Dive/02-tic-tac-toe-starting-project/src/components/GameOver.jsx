export default function GameOver({ winner, onRestart }) {
  let gameResult = <p>{winner} won!</p>;
  if (!winner) gameResult = <p>It's a draw!</p>;

  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {gameResult}
      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  );
}
