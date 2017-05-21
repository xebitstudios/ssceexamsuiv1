var express = require('express');
var path = require('path');
var app = express();

var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

// Configuration
var rootPath = path.normalize(__dirname + '/../');
var port = 8066;
app.use(bodyParser.urlencoded({extended: true})); // so we can get info from POST and/or URL parameters
app.use(bodyParser.json());
app.use(morgan('dev')); // use morgan to log requests to the console

app.use(express.static(rootPath + '/app'));

// var config = require(rootPath + '/app/js/config');  // get our config file
// mongoose.connect(config.database); // connect to DB
// app.set('superSecret', config.secret); // secret variable

// get an instance of the router for API routes
var apiRoutes = express.Router();

// Common API Routes
// var testApi = require(rootPath +   '/app/js/API/testApi')(app);
var dbApi = require(rootPath +   '/app/js/dbApi')(app, port, rootPath, apiRoutes);
var analyticsApi = require(rootPath +   '/app/js/analyticsApi')(app, port, rootPath, apiRoutes);
var queryApi = require(rootPath +   '/app/js/queryApi')(app, port, rootPath, apiRoutes);
var subjsApi = require(rootPath +   '/app/js/subjsApi')(app, port, rootPath, apiRoutes);
var usersApi = require(rootPath +   '/app/js/usersApi')(app, port, rootPath, apiRoutes);

app.get('*', function(req, res) {
	res.sendFile(rootPath + '/app/index.html');
});

app.listen(port, '0.0.0.0', function() {
	console.log('Express started on ' + port + ';. press Ctrl-C to terminate.');
});
