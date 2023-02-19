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

_db.authenticate().then(() => {
  console.log("Connection has been established successfully.");
}).catch((err) => {
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
    type: Sequelize.DATE
  },
  duration: {
    type: Sequelize.INTEGER
  },
  player1: {
    type: Sequelize.STRING
  },
  player2: {
    type: Sequelize.STRING
  },
  lastPlayerToMove: {
    type: Sequelize.STRING
  },
  winner: {
    type: Sequelize.STRING
  },
  loser: {
    type: Sequelize.STRING
  },
  board: {
    type: Sequelize.JSONB
  }
})

_db.sync().then(() => {
  console.log("Database & tables created!");
}).catch((err) => {
  console.log("Error creating database & tables", err);
})

module.exports = {
  insertGame: (gameName, callback) => {
    console.log("gameName", gameName);
    Game.create({
      name: gameName,
      status: "active",
      start_time: _db.fn("NOW"),
      player1: "true",
      lastPlayerToMove: "2", // player1 starts
      board: sideStacker.createBoard()
    }).then((game) => {
      console.log("Game created successfully");
      callback(game, null);
    }).catch((error) => {
      console.log("error", error)
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
        id: gameId
      }
    }).then((game) => {
      callback(game, null);
    }).catch((error) => {
      callback(null, error)
    });
  },
  updateBoard: (move, callback) => {
    _db.models.Game.findOne({
      where:{
        id: move.gameId  
      }
    }).then((gameInstance) => {

      console.log("game found", gameInstance.board[move.rowIndex]);

      const newBoard = sideStacker.move(
        gameInstance.board, 
        move.rowIndex, 
        move.side, 
        move.player
      );
      gameInstance.lastPlayerToMove = move.player;
      gameInstance.board[move.rowIndex] = newBoard[move.rowIndex];
      gameInstance.changed('board', true);
      gameInstance.save().then((updatedGame) => {
        console.log("board updated", updatedGame.board[move.rowIndex]);
        callback(updatedGame, null);
      });
    }).catch((error) => {
      callback(null, error)
    });
  }
};
