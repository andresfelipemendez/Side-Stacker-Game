const express = require('express');
const cors = require('cors'); 
const {Sequelize, Schema, DataTypes } = require("sequelize");

const recordRoutes = express.Router();
recordRoutes.use(cors());

const dbo = require('../db/conn');

recordRoutes.route('/games').get( function (req,res) {
    let db_connect = dbo.getDb();

    console.log("games",db_connect.models.Game);

    db_connect.models.Game.findAll().
    then((games) => {
        console.log("games",games);
        res.status(200);
        res.json(games);
    }).catch((error) => res.status(400).send({ message: error }));
    
    
    

});

recordRoutes.route('/games/add').post(function (req,res) {
    let db_connect = dbo.getDb();

    const game = new db_connect.models.Game({
        game_name: "req.body.game_name",
        game_status: "req.body.game_status",
        game_start_time: db_connect.fn('NOW'),
        game_end_time: db_connect.fn('NOW'),
        game_duration: 1,
        game_players: 2,
        game_winner: "req.body.game_winner",
        game_loser: "req.body.game_loser",
    });

    game
        .save()
        .then(() => res.status(201).send({ message: 'Game created successfully' }))
        .catch((error) => res.status(400).send({ message: error }));
});

recordRoutes.route('/record').get(function (req,res) {
    let db_connect = dbo.getDb();
    
});

recordRoutes.route('/record/:id').get(function (req,res) {
    let db_connect = dbo.getDb();

});

module.exports = recordRoutes;

