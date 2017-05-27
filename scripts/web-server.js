var express = require('express');
var path = require('path');
var cors = require('cors');
var app = express();

var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var whitelist = ['http://34.225.111.67', 'http://localhost:8065'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
};
// var corsOptions = {
//   origin: 'http://localhost:8065',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
// }
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', "*");
	res.setHeader('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE");
	res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

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
var dbApi = require(rootPath +   '/app/js/dbApi')(app, port, rootPath, apiRoutes, cors, corsOptions);
var analyticsApi = require(rootPath +   '/app/js/analyticsApi')(app, port, rootPath, apiRoutes, cors, corsOptions);
var queryApi = require(rootPath +   '/app/js/queryApi')(app, port, rootPath, apiRoutes, cors, corsOptions);
var subjsApi = require(rootPath +   '/app/js/subjsApi')(app, port, rootPath, apiRoutes, cors, corsOptions);
var usersApi = require(rootPath +   '/app/js/usersApi')(app, port, rootPath, apiRoutes, cors, corsOptions);

app.get('*', function(req, res) {
	res.sendFile(rootPath + '/app/index.html');
});

app.listen(port, '0.0.0.0', function() {
	console.log('Express started on ' + port + ';. press Ctrl-C to terminate.');
});
