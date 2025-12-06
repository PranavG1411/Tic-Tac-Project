import { useState } from "react";

export default function Player({ playername, symbol, isActive, OnChangeName }) {
  const [PlayerName, setPlayerName] = useState(playername);
  const [isEditing, setEditing] = useState(false);

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  function HandleOnclick() {
    setEditing((editing) => !editing);
    if (isEditing) {
      OnChangeName(symbol, PlayerName);
    }
  }

  let Name = <span className="player-name">{PlayerName}</span>;
  let btnCaption = "Edit";

  if (isEditing) {
    Name = (
      <input type="text" required value={PlayerName} onChange={handleChange} />
    );
    btnCaption = "Save";
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span>
        {Name}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={HandleOnclick}>{btnCaption}</button>
    </li>
  );
}
