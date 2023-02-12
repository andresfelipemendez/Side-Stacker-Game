import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import ListOfGames from "./components/listOfGames";
import Game from "./components/game";
import CreateGame from "./components/createGame";


function App() {
  return (
    <div>
    <Navbar />
     <Routes>
       <Route exact path="/" element={<ListOfGames />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<CreateGame />} />
     </Routes>
  </div>
  );
}

export default App;
