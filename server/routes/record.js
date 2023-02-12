const express = require('express');

const recordRoutes = express.Router();

const dbo = require('../db/conn');

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

    // db_connect
    //     .collection('records')
    //     .find({})
    //     .toArray(function(err, result){
    // });
});

recordRoutes.route('/record').get(function (req,res) {
    let db_connect = dbo.getDb('side_stacker');
    const MyModel = db_connect.model('Test', new Schema({ name: String }));
    // db_connect
    //     .collection('records')
    //     .find({})
    //     .toArray(function(err, result){
    // });
});

recordRoutes.route('/record/:id').get(function (req,res) {
    let db_connect = dbo.getDb();
    // let myquery = { _id: ObjectId(req.params.id) };
    // db_connect
    //     .collection('records')
    //     .findOne(myquery, function(err, result){
    //         if (err) throw err;
    //         res.json(result);
    // });
});

module.exports = recordRoutes;

