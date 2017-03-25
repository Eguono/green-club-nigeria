'use strict';
//Web Server
const express = require('express');
const webRoutes = require('./route/routes.js');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const formidable = require('formidable');
const fs = require('fs');

//Instance of Express App
const app = express();
const route = express.Router();

//Setup Port for Web App
const port = process.env.PORT || 5000;

//Setup Ejs as View Engine
app.set('views', process.cwd() + '/views');
app.set('view engine', 'ejs');

//Setup static folder
app.use(express.static('./public'));

//using bodyParser as middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Web App Routes
webRoutes(app, route);


//Setup app Listening
app.listen(port, () => {
    console.log("Listening on port: " + port);
});