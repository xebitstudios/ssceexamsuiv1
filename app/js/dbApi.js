module.exports = function(app, port, rootPath, apiRoutes) {
	console.log('rootPath is: ' + rootPath);
	var _ = require('underscore');
	var mongoose = require('mongoose');
	var jwt = require('jsonwebtoken');
	var config = require(rootPath + '/app/js/config');
	var Schema = mongoose.Schema;
	// get our mongoose model
	var User = require(rootPath + '/app/js/models/Users');

	var bcrypt = require('bcrypt-nodejs'); // load the bcrypt module
	var salt = bcrypt.genSaltSync(12); // generate a salt, higher values make it longer to encrypt and decrypt
	// var hash = bcrypt.hashSync('my password', salt); // hash the password with the salt

	mongoose.connect(config.database); // connect to DB
	var db = mongoose.connection;
	 
	db.on('error', function (err) {
		console.log('connection error', err);
	});

	db.once('open', function () {
		console.log('SSCEexams DB is now connected.');
		// getUserByUsername('xebitstudios');
		// getUserByUsernameAndPassword('adam', 'silver');
	});

	var getUserByUsername = function(uname) {
		User.findOne({ 
			username: uname
		}, function (err, User) {
			if(err) { 
				console.log('Error occured, something went wrong!'); 
			} else if(User == null) {
				console.log('Username not found!');
			} else if(User.firstname) {
				console.log("User found is: " + User.firstname + " " + User.lastname + ".");
				console.log('User Subscription is: ' + User.subscriptionlevel);
				return User;
			} else {
				console.log('User has no firstname!');
			}
			return {data: 'Not found'};
		});
	};

	var getUserByUsernameAndPassword = function(uname,pwd) {
		var dUser = {};
		User.findOne({ 
			username: uname,
			password: pwd
		}, function (err, User) {
		    if(err) { 
				console.log('Error occured, something went wrong!'); 
			} else if(User == null) {
				console.log('Username and Password not found!');
			}  else if(User.firstname) {
				console.log("User found is: " + User.firstname + " " + User.lastname + ".");
				console.log('User Subscription is: ' + User.subscriptionlevel);
				dUser.username = User.username;
				// console.log(User);
				return dUser;
			} else {
				console.log('Error occured, User not found using the username and password!');
			}
			return {data: 'Not found'};
		});
	};

	var ssceApi = config.ApiElasticIp;
	console.log('ssceApi is: ' + ssceApi);

	// apply the routes to our application with the prefix /api
	app.use('/api', apiRoutes);

	// app.set('superSecret', config.secret); // secret variable

	var allowCors = function(req, res, next) {
		// res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Origin', 'http://54.172.215.160:8065');		
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'Content-Type');
		res.header('Access-Control-Allow-Credentials', 'true');
		next();
	};

	app.use(allowCors);

	app.get('/api/ingestlogs', function(req, res) {
		console.log('Ingested log data is: ');
		console.log(req.body);
		res.send('Ingested log data received');
	});

	// DB and Token Test APIs
	apiRoutes.get('/', function(req, res) {
		res.send('Hello! The API is at http://localhost:' + port + '/api');
	});

	// Login a User with the supplied Username and Password
	app.post('/api/user/login', function(req, res) {
		console.log('User login data is: ');
		console.log('req.body.username is: ' + req.body.username);
		User.findOne({
			username: req.body.username,
			password: req.body.password
		}, function (err, dUser) {
		    if(err) return console.log('Error occured, something went wrong!');
		    // createUser(dUser);
		    if(dUser==null) {
		    	console.log('No User Record found!');
		    	res.send({ status: 'failed' });
		    } else {
		    	console.log('User Record found, Login succeeded!');
		    	console.log(dUser);
		    	res.send(dUser);
		    }
		});
	});
	
	// Create a new User and save to the database
	app.post('/api/user/create', function(req, res) {
		console.log('Creating new User with data');
		console.log('req.body.username is: ' + req.body.username);
		var auser = new User({
		    email: req.body.email,
		    username: req.body.username,
		    password: req.body.password,
		    firstname: req.body.firstname,
		    lastname: req.body.lastname,
		    joindate: req.body.joindate,
		    subscriptionlevel: req.body.subscriptionlevel,
		    dob: req.body.dob,
		    status: req.body.status,
		    accesscode: req.body.accesscode,
		    subjectslist: req.body.subjectslist,
		    subscriptionstartdate: req.body.subscriptionstartdate,
		    subscriptionenddate: req.body.subscriptionenddate,
		    isadmin: req.body.isadmin
		});
		auser.save(function(err) {
		  if (err) {
		  	// console.error(err);
		  	console.log('User Creation failed!');
		    res.send({ status: 'failed' });
		  } else {
		  	console.log('auser is saved!');
		  	res.send({ status: 'OK' });
		  }
		});
	});

	// Get all the users
	app.get('/api/users', function(req, res) {
		console.log('Users list data is: ');
		User.find({}, function(err, users) {
			if (err) {
			  	// console.error(err);
			  	console.log('Users Search failed!');
			    res.send({ status: 'failed' });
			} else {
			  	console.log('Users found!');
			  	console.log(users);
			  	res.send({ 
			  		status: 'OK' ,
			  		users: users
			  	});
			}
		});
	});

	// apiRoutes.get('/setup', function(req, res) {
	// 	function seedDBFunction(collection){ 
	// 		// _.each(collection, function(model){ 
	// 	 //        model.remove(function (err, data) {
	// 		// 		if (err) console.log(err);
	// 		// 		else console.log('Deleted : ', data );
	// 		// 	});
	// 	 //    }); 

	// 	 //    _.each(collection, function(model){ 
	// 	 //        model.save(function (err, data) {
	// 		// 		if (err) console.log(err);
	// 		// 		else console.log('Saved : ', data );
	// 		// 	});
	// 	 //    }); 
	// 	    res.json({ success: true });
	// 	};
	// 	// seed data into the DB, normally you will protect your password by hashing it
	// 	var usersSeed = [
	// 		new User({ name: 'Adetunji', password: 'adetunjipwd', admin: true }),
	// 		new User({ name: 'John', password: 'johnpwd', admin: false }),
	// 		new User({ name: 'Jane', password: 'janepwd', admin: false }),
	// 		new User({ name: 'Bawo', password: 'bawopwd', admin: false })
	// 	];

	// 	// let us see a custom method with mongoose
	// 	var chris = new User({
	// 	  	name: 'Chris',
	// 	  	password: 'chrispwd' 
	// 	});

	// 	seedDBFunction(usersSeed);
	// });

	// API Routes below
	// app.post('/api/authenticate', function (req, res) {
	// 	res.send({
	// 		success: true,
	// 		message: "Enjoy your token!",
	// 		token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3QiLCJ1c2VyUHdkIjoiJDJhJDEyJGd6N01XU1VpQmdxSDVYemtiaEFnLmVqa1gxMTRRNy9iYloxVG1iRm5zQnpZSVNGZUV1ZE9LIiwiaWF0IjoxNDg4MTUxNTQ1LCJleHAiOjE0ODk2NTE1NDV9.IGF9IwOmNYSPAjOSBb2UmkC0VUC0k9reZh9clGK9vzY"
	// 	});
	// });
};

// Notes: the JWT contains Claims ( data to be transmitted between server and client ) and it can be passed through
// the request either in Header or URL or Body. In case of GET verb , we will pass the JWT through the URL or Header
// but actually anyone else can have this token and use it

// The token must be defined in the header section of the request. Most solutions stands for setting the 'Authorization' key
// in the header. In this case as he is using the JWT token, the value of the 'Authorization' will be 'JWT [jwt-web-token-value]'.
// The idea is to send the token on every request getting a complete stateless API REST. 

// // jquery
// $.ajaxSetup({
//   headers: {
//     'x-access-token': jwt
//   }
// });

// // angular
// $http.defaults.headers.common['x-access-token'] = jwt

// The only way I've figured to do this on GET requests I want authenticated is to have a client-side function
// perform window.location.href = '/protected/'+token; where token is the JWT stored locally, retrieved and then accessed server side as a req.param

// Let’s test this out using POSTman. Change your HTTP request to POST and add the name and password parameters to x-www-form-urlencoded.
// This is how we simulate information coming through a form POST

