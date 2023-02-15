
import React, { useState, useEffect } from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import ListOfGames from "./components/listOfGames";
import Game from "./components/game";
import CreateGame from "./components/createGame";


function App() {

  return (
    <div>
    <Navbar />
     <Routes>
       <Route exact path="/" element={<ListOfGames />} />
       <Route path="/game/:id" element={<Game />} />
       <Route path="/createGame" element={<CreateGame />} />
     </Routes>

     
  </div>
  );
}

export default App;
