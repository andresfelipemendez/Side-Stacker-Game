const Sequelize = require("sequelize");
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
  winner: {
    type: Sequelize.STRING
  },
  loser: {
    type: Sequelize.STRING
  },
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
      player1: "true"
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

};
