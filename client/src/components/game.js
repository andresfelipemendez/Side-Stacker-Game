// create react component named Game
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../context/socket";
import Board from "./board";

export default function Game() {
  const params = useParams();
  const socket = useContext(SocketContext);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [board, setBoard] = useState([
    {row:[0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0},
    {row:[0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0},
    {row:[0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0},
    {row:[0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0},
    {row:[0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0},
    {row:[0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0},
    {row:[0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0}
  ]);

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
      console.log("updateBoard", newBoard);
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
  }, [params, socket]);

  const sendPlayerMove = ({rowIndex, side, player}) => {
    const gameId = params.id;
    console.log("sendPlayerMove", { gameId, rowIndex, side, player });
    socket.emit("playerMove", {  gameId, rowIndex, side, player });
  };

  return (
    <div>
      <h3>Game</h3>
      <Board board={board} sendPlayerMove={sendPlayerMove} />
    </div>
  );
}