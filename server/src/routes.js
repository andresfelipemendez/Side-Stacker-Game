const express = require("express");
const cors = require("cors");

const recordRoutes = express.Router();
recordRoutes.use(cors());

const db = require("./db");

recordRoutes.route("/games").get(function (req, res) {
  db.getGames((games,error) => {
    if(!error) {
      console.log(res)
      res.status(200);
      res.json(games);
    } else {
      console.log("error", error)
      res.status(400).send({ message: error });
    }
  });
});

recordRoutes.route("/games/add").post(function (req, res) {
  db.insertGame(req.body.game_name, (game,error) => {
    if(!error) {
      console.log("game created", game);
      res.status(201);
      res.json(game);
    } else {
      console.log("error", error);
      res.status(400).send({ message: error });
    }
  });
});

module.exports = recordRoutes;
