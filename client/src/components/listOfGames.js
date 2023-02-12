import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

const GameRow = (props) => (
  <tr>
    <td>{props.game._id}</td>
    <td>{props.game.game_name}</td>
    <td>{props.game.game_status}</td>
    <td>{props.game.game_start_time}</td>
    <td>{props.game.game_end_time}</td>
    <td>{props.game.game_duration}</td>
    <td>{props.game.game_players}</td>
    <td>{props.game.game_winner}</td>
    <td>{props.game.game_loser}</td>
  </tr>
);

export default function ListOfGames() {
  const [games, setGames] = useState([]);

  useMemo(() => {
    async function getGames() {
      const response = await fetch(`http://localhost:5000/games/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const games = await response.json();
      setGames(games);
    }
    getGames();
    return;
  }, [games.length]);

  async function deleteGame(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });
    const newGames = games.filter((el) => el._id !== id);
    setGames(newGames);
  }

  function gameList() {
     return games.map((game) => {
       return <GameRow game={game} deleteGame={deleteGame} key={game._id} />;
    });
  }

  return (
    <div>
      <h3>Running Games</h3>
      <table className="table">
        <thead className="thead-light" >
        <tr>
          <th>Game ID</th>
          <th>Game Name</th>
          <th>Game Status</th>
          <th>Game Start Time</th>
          <th>Game End Time</th>
          <th>Game Duration</th>
          <th>Game Players</th>
          <th>Game Winner</th>
          <th>Game Loser</th>
        </tr>
        </thead>   
        <tbody>{gameList()}</tbody>
      </table>
    </div>
  );
}
