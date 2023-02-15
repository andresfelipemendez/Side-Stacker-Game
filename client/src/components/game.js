// create react component named Game
import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import Board from "./board";

const socket = io.connect('http://localhost:3001');



export default function Game() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState(null);
  
    useEffect(() => {
      socket.on('connect', () => {
        setIsConnected(true);
      });
  
      socket.on('disconnect', () => {
        setIsConnected(false);
      });
  
      socket.on('pong', () => {
        setLastPong(new Date().toISOString());
      });
  
      return () => {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('pong');
      };
    }, []);
  
    const sendPing = () => {
      socket.emit('ping');
    }

    var initialBoard = [    ["_", "_", "_", "_", "_", "_", "_"],
        ["o", "x", "_", "_", "_", "_", "o"],
        ["x", "_", "_", "_", "_", "x", "x"],
        ["x", "_", "_", "_", "_", "_", "o"],
        ["o", "_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_", "_"]
    ]
    return (
        <div>
            <h3>Game</h3>

            <Board initialBoard={initialBoard} />

            <div>
            <p>Connected: { '' + isConnected }</p>
            <p>Last pong: { lastPong || '-' }</p>
            <button onClick={ sendPing }>Send ping</button>
            </div>
        </div>
    );
}