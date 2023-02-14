const express = require('express');

const recordRoutes = express.Router();

const {dbo, Game} = require('../db/conn');

const ObjectId = require('mongodb').ObjectID;

recordRoutes.route('/games').get(function (req,res) {
    let db_connect = dbo.getDb('side_stacker');
    const MyModel = db_connect.model('games', new Schema({ 
        game_id: String,
        game_name: String,
        game_status: String,
        game_start_time: String,
        game_end_time: String,
        game_duration: String,
        game_players: String,
        game_winner: String,
        game_loser: String
    }));

    MyModel.find({}, function(err, result){
        if (err) throw err;
        res.json(result);
    });

});

recordRoutes.route('/games/add').post(function (req,res) {
    console.log(req.body);

    const game = new Game({
        game_name: "req.body.game_name",
        game_status: "req.body.game_status",
        game_start_time: "req.body.game_start_time",
        game_end_time: "req.body.game_end_time",
        game_duration: "req.body.game_duration",
        game_players: "req.body.game_players",
        game_winner: "req.body.game_winner",
        game_loser: "req.body.game_loser",
    });

    game
        .save()
        .then(() => res.status(201).send({ message: 'Game created successfully' }))
        .catch((error) => res.status(400).send({ message: error }));
});

recordRoutes.route('/record').get(function (req,res) {
    let db_connect = dbo.getDb('side_stacker');
    
});

recordRoutes.route('/record/:id').get(function (req,res) {
    let db_connect = dbo.getDb();

});

module.exports = recordRoutes;

