import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CreateGame from "./createGame";
import {
  Card,
  Table,
  Button,
  ButtonGroup,
  Row,
  Container,
} from 'reactstrap';

function GameRow(props) {
  const navigate = useNavigate();

  function clickMe(e) {
    navigate("/game/" + props.game.id + "/player/" + e.target.getAttribute("player"));
  };

  return (
    <tr key={props.game.id}>
      <td>{props.game.name}</td>
      <td>{props.game.status}</td>
      <td>
        <ButtonGroup>
          <Button color="primary" onClick={clickMe} player="1" outline>
            Player 1
          </Button>
          <Button color="primary" onClick={clickMe} player="2" outline>
            Player 2
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  )
};

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
  }, []);

  function gameList() {
    return games.map((game) => {
      return <GameRow game={game} key={game.id} />;
    });
  }

  return (
    <>
    <Container >
      <Row>
        <CreateGame />
      </Row>
      <Row>
        <Card className="mt-3">
        <Container>
        <h3 className="mt-3">Running Games</h3>
        <Table className="table mt-3">
          <thead className="thead-light" >
            <tr>
              <th>Game Name</th>
              <th>Game Status</th>
              <th>Players</th>
            </tr>
          </thead>
          <tbody>{gameList()}</tbody>
        </Table>  
        </Container>
        </Card>
      </Row>
    </Container>
    </>
  );
}
