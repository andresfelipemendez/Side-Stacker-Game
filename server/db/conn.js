const Sequelize = require("sequelize");
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, dialect } = process.env;

_db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = {
  connectToServer: function (callback) {
    console.log("connecting to database");

    _db
      .authenticate()
      .then(async () => {
        console.log("Connection has been established successfully.");
        await _db.sync();
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });
  },

  getDb: function () {
    return _db;
  },
  Game: _db.define("Game", {
    game_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    game_status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    game_start_time: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    game_end_time: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    game_duration: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    game_players: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    game_winner: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    game_loser: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }),
};
