// create react component named Game
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../context/socket";
import Board from "./board";

export default function Game() {
  const params = useParams();
  const socket = useContext(SocketContext);
  const playerId = params.playerId;
  const [playerTurn, setPlayerTurn] = useState("Waiting for other player");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [board, setBoard] = useState(
    { 
      board:
      [
        {row:[0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0},
        {row:[0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0},
        {row:[0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0},
        {row:[0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0},
        {row:[0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0},
        {row:[0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0},
        {row:[0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0}
      ]
    }
  );

  useEffect(() => {
    socket.on('connect', () => {
      console.log("connect", params);

      socket.emit('getBoard', { 
        gameId: params.id,
        playerId: params.playerId
      });
      
      setIsConnected(true);
    });

    socket.on("updateBoard", (newBoard) => {
      setPlayerTurn(newBoard.lastPlayerToMove === playerId ? "Waiting for other player" : "Your turn");
      setBoard(newBoard);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('updateBoard');
      socket.off('disconnect');
    };
  }, []);

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