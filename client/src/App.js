import io from 'socket.io-client';
import React, { useState, useEffect } from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import ListOfGames from "./components/listOfGames";
import Game from "./components/game";
import CreateGame from "./components/createGame";

const socket = io.connect('http://localhost:3001');

function App() {
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

  return (
    <div>
    <Navbar />
     <Routes>
       <Route exact path="/" element={<ListOfGames />} />
       <Route path="/game/:id" element={<Game />} />
       <Route path="/createGame" element={<CreateGame />} />
     </Routes>

     <div>
      <p>Connected: { '' + isConnected }</p>
      <p>Last pong: { lastPong || '-' }</p>
      <button onClick={ sendPing }>Send ping</button>
    </div>
  </div>
  );
}

export default App;
