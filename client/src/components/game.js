// create react component named Game
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../context/socket";
import Board from "./board";

export default function Game() {
  const params = useParams();
  const socket = useContext(SocketContext);
  const playerId = params.playerId;
  const [playerTurn, setPlayerTurn] = useState("Loading...");

  const [isConnected, setIsConnected] = useState(socket.connected);

  const [board, setBoard] = useState(null);
  
  const setPlayerTurnTitle = (itsMyTurn) => {
    if(itsMyTurn) {
      setPlayerTurn("its your turn")
    } else {
      setPlayerTurn("waiting for other player")
    }
  }

  useEffect(() => {

    if(isConnected){ 
      socket.emit('getBoard', { 
        gameId: params.id,
        playerId: params.playerId
      });
    } else {
      socket.on('connect', () => {
        setIsConnected(true);
      }); 
    }

    socket.on("updateBoard", (newBoard) => {
      setBoard(newBoard);
      console.log("updateBoard", newBoard);

      switch(newBoard.gameState) {
        case "newGame": {
          setPlayerTurnTitle(playerId === "1");
          break;
        }
        case "player1Turn": {
          setPlayerTurnTitle(playerId === "1");
          break;
        }
        case "player2Turn":{
          setPlayerTurnTitle(playerId === "2");
          break;
        }
        case "player1won": {
          setPlayerTurn("Player 1 won!");
          break;
        }
        case "player2won": {
          setPlayerTurn("Player 2 won!");
          break;
        }
      }
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('updateBoard');
      socket.off('disconnect');
    };
  }, [ isConnected, params,playerId,playerTurn]);

  const sendPlayerMove = ({rowIndex, side, player}) => {
    const gameId = params.id;
    console.log("sendPlayerMove", { gameId, rowIndex, side, player });
    socket.emit("playerMove", {  gameId, rowIndex, side, player });
  };

  return (
    <div>
      <h3>{playerTurn}</h3>
      <Board board={board} player={playerId} sendPlayerMove={sendPlayerMove} />
    </div>
  );
}