const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: './.env' });
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(require('./routes/record'));

const dbo = require('./db/conn');

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the origin of your frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
  };
app.use(cors());

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    dbo.connectToServer( function( err ) {
        if (err) console.error(err);
    } );

    console.log(`Server is running on port: ${port}`);
});

