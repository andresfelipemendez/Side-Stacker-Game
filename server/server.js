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

const sideStacker = require("./src/sideStacker");

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});

io.on("connection", (socket) => {
  
  const board = sideStacker.createBoard();

  console.log("a user connected");
  socket.emit("updateBoard", sideStacker.getStrippedBoard(board));

  socket.on("playerMove", (move) => {
    const { rowIndex, side, player } = move;
    const newBoard = sideStacker.move(board, rowIndex, side, player);
    socket.emit("updateBoard", sideStacker.getStrippedBoard(newBoard));
    console.log("a user send playerMove", move);
  });

  socket.on("ping", (params) => {

    io.to(socket.id).emit("pong");
    console.log("a user send ping", params);

  });
});
