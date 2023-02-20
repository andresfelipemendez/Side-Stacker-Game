const Sequelize = require("sequelize");
const sideStacker = require("./sideStacker");
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, dialect } = process.env;

const _db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

_db
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const Game = _db.define("Game", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  start_time: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  end_time: {
    type: Sequelize.DATE,
  },
  duration: {
    type: Sequelize.INTEGER,
  },
  gameState: {
    type: Sequelize.ENUM(
      "newGame",
      "player1Turn",
      "player2Turn",
      "player1won",
      "player2won"
    ),
    allowNull: false,
  },
  player1: {
    type: Sequelize.STRING,
  },
  player2: {
    type: Sequelize.STRING,
  },
  board: {
    type: Sequelize.JSONB,
  },
});

_db
  .sync()
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.log("Error creating database & tables", err);
  });

module.exports = {
  insertGame: (gameName, callback) => {
    console.log("gameName", gameName);
    Game.create({
      name: gameName,
      status: "active",
      start_time: Date.now(),
      player1: "true",
      gameState: "newGame",
      board: sideStacker.createBoard(),
    })
      .then((game) => {
        console.log("Game created successfully");
        callback(game, null);
      })
      .catch((error) => {
        console.log("error", error);
        callback(null, error);
      });
  },
  getGames: (callback) => {
    _db.models.Game.findAll()
      .then((games) => {
        callback(games, null);
      })
      .catch((error) => callback(null, error));
  },
  getGame: (gameId, callback) => {
    console.log("find gameId in db", gameId);
    _db.models.Game.findOne({
      where: {
        id: gameId,
      },
    })
      .then((game) => {
        callback(game, null);
      })
      .catch((error) => {
        callback(null, error);
      });
  },
  updateBoard: (move, callback) => {
    _db.models.Game.findOne({
      where: {
        id: move.gameId,
      },
    })
      .then((gameInstance) => {
        switch (gameInstance.gameState) {
          case "newGame": {
            if (move.player === "1") {
              gameInstance.gameState = "player2Turn";
            } else {
              return callback(null, "player 1 must start the game");
            }
            break;
          }
          case "player1Turn": {
            gameInstance.gameState = "player2Turn";
            break;
          }
          case "player2Turn": {
            gameInstance.gameState = "player1Turn";
            break;
          }
        }

        const newBoard = sideStacker.move(
          gameInstance.board,
          move.rowIndex,
          move.side,
          move.player
        );

        gameInstance.board[move.rowIndex] = newBoard.board[move.rowIndex];

        if (newBoard.win) {
          var gameState = "player" + move.player + "won";
          var end_time = Date.now();
          var duration = Date.now() - gameInstance.start_time;

          console.log(
            "gameState",
            gameState,
            "end_time",
            end_time,
            "duration",
            duration
          );
          gameInstance.gameState = gameState;
          gameInstance.end_time = end_time;
          gameInstance.duration = duration;
        }

        gameInstance.changed("board", true);
        gameInstance
          .save()
          .then((updatedGame) => {
            console.log("board updated", updatedGame.board[move.rowIndex]);
            callback(updatedGame, null);
          })
          .catch((error) => {
            console.log("error", error);
            callback(null, error);
          });
      })
      .catch((error) => {
        console.log("error", error);
        callback(null, error);
      });
  },
};
