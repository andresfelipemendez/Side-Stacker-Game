import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

function GameRow (props) {
  const navigate = useNavigate();
  function clickMe() {
    console.log("clicked",props);
    navigate("/game/"+props.game.id);
  };

  return(
    <tr onClick={clickMe} gameId={props.game.id}>
      <td>{props.game.id}</td>
      <td>{props.game.game_name}</td>
      <td>{props.game.game_status}</td>
      <td>{props.game.game_players}</td>
    </tr>
)};

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
       return <GameRow game={game} deleteGame={deleteGame} key={game.id} />;
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
          <th>Game Players</th>
        </tr>
        </thead>   
        <tbody>{gameList()}</tbody>
      </table>
    </div>
  );
}
