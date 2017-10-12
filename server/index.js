// Importing Node modules and initializing Express
const   express = require('express'),
        app = express(),
        logger = require('morgan'),
        config = require('./config/main');

// Start the server
const server = app.listen(config.port);
console.log('Your server is running on port ' + config.port + '.');

// Setting up basic middleware for all Express requests
app.use(logger('dev'));

// Enable CORS from client-side
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});


// Adding JWT Authentication and Connecting to MongoDB
const   bodyParser = require('body-parser'),
        mongoose = require('mongoose');

// Database connection
mongoose.connect(config.database);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const router = require('./router');
router(app);

var socketEvents = require('./socketEvents');
const io = require('socket.io').listen(server);

socketEvents(io);