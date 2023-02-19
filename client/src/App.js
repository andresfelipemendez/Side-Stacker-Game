
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Routes } from "react-router-dom";
import { SocketContext, socket } from "./context/socket";

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
     </Routes>
     </SocketContext.Provider>
     
  </div>
  );
}

export default App;
