const Sequelize = require("sequelize");
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, dialect } = process.env;

var _db;

module.exports = {
  connectToServer: function (callback) {
    console.log("connecting to database");
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

    _db
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });
  },

  getDb: function () {
    return _db;
  },
};
