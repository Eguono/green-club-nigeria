'use strict';
//Web Server
const express = require('express');
const webRoutes = require('./route/routes.js');

//Instance of Express App
const app = express();
const route = express.Router();

//Setup Port for Web App
const port = process.env.PORT || 5000;

//Setup Twig as View Engine
app.set('view', process.cwd() + 'views');
app.set('view engine', 'ejs');

//Setup static folder
app.use(express.static('./public'));

//Web App Routes
webRoutes(app, route);


//Setup app Listening
app.listen(port, () => {
    console.log("Listening on port: " + port);
});