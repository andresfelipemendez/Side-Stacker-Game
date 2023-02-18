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
    ["_", "_", "_", "_", "_", "_", "_"],
    ["_", "x", "_", "_", "_", "_", "o"],
    ["x", "_", "_", "_", "_", "x", "x"],
    ["x", "_", "_", "_", "_", "_", "o"],
    ["o", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_"]
  ]);

  useEffect(() => {
    socket.on('connect', (io) => {
      console.log("connect", io, params);
      
      
      socket.emit('ping', { gameId: params.id });
      setIsConnected(true);
    });

    socket.on("updateBoard", (newBoard) => {
      console.log("updateBoard", newBoard);
      setBoard(newBoard);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      console.log("pong")
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, [params, socket]);

  const sendPlayerMove = (e) => {
    e.preventDefault();
    const rowIndex = e.target.getAttribute("row");
    const side = e.target.getAttribute("side");
    console.log("sendPlayerMove", { rowIndex, side });
    socket.emit("playerMove", { rowIndex, side });
  }

  return (
    <div>
      <h3>Game</h3>
      <Board board={board} sendPlayerMove={sendPlayerMove} />
    </div>
  );
}