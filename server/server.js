const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const port = process.env.PORT || 5000;

const server = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(require("./src/routes"));

const db = require("./src/db");

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});

// where is the player id?
// when the player moves, wait for the other player to move
// when the other player moves, update the board
// when the game is over, update the database
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("getBoard", (params) => {
    console.log("a user requested a gameBoard", params);
    socket.join(params.gameId);

    db.getGame(params.gameId, (game, error) => {
      if (!error) {
        socket.emit("updateBoard", game);
      } else {
        socket.emit("updateBoard", {
          message: error,
        });
      }
    });
  });

  socket.on("playerMove", (move) => {
    console.log("a user made a move", move);
    db.updateBoard(move, (updateGame, error) => {
      if (!error) {
        io.sockets.in(move.gameId).emit("updateBoard", updateGame);
      } else {
        socket.emit("updateBoard", {
          message: error,
        });
      }
    });
  });
});
