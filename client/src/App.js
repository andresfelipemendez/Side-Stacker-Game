
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './App.css';

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import { SocketContext, socket } from "./context/socket";
// We import all the components we need in our app

import GameNavbar from "./components/navbar";
import ListOfGames from "./components/listOfGames";
import Game from "./components/game";

function App() {

  return (
    <div>
    <GameNavbar />
    <SocketContext.Provider value={socket}>
    <Routes>
       <Route exact path="/" element={<ListOfGames />} />
       <Route path="/game/:id" element={<Game />} />
       {/* <Route path="/createGame" element={<CreateGame />} /> */}
     </Routes>
     </SocketContext.Provider>
     
  </div>
  );
}

export default App;
