module.exports = function(app, port, rootPath, apiRoutes) {
	console.log('rootPath is: usersApi');
	var _ = require('underscore');
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	// get our mongoose model
	var User = require(rootPath + '/app/js/models/Users');
	var ContactUs = require(rootPath + '/app/js/models/ContactUss');

	// define the schemas you want to query and try them out as below

	// get active available user details
	apiRoutes.get('/users/all', cors(corsOptions), function(req, res) {
		User.find({
		}, function(err, users) {
		  if (err) throw err;
		  console.log(users);
		  res.json({
		  	data: {
		  		"users": users
		  	}
		  });
		});
	});

	// get active available user details
	apiRoutes.get('/users/active', cors(corsOptions), function(req, res) {
		User.find({
			"status": "active"
		}, function(err, users) {
		  if (err) throw err;
		  console.log(users);
		  res.json({
		  	data: {
		  		"users": users
		  	}
		  });
		});
	});

	// get list of all users using a specific accesscode
	apiRoutes.get('/users/code', cors(corsOptions), function(req, res) {
		// http://localhost:8066/api/users/code?acode=FREE50
		console.log(req.query.acode);
		User.find({
			"accesscode": req.query.acode
		}, function(err, users) {
		  if (err) throw err;
		  console.log(users);
		  res.json({
		  	data: {
		  		"users": users
		  	}
		  });
		});
	});

	// get list of all users using a specific subscriptionlevel
	apiRoutes.get('/users/level', cors(corsOptions), function(req, res) {
		// http://localhost:8066/api/users/level?dlevel=free
		console.log(req.query.acode);
		User.find({
			"subscriptionlevel": req.query.dlevel
		}, function(err, users) {
		  if (err) throw err;
		  console.log(users);
		  res.json({
		  	data: {
		  		"users": users
		  	}
		  });
		});
	});

	// find a specific user details using the username and password - WORKS!
	// http://localhost:8066/api/finduser?uname=bawo&pword=oyowe
	apiRoutes.get('/finduser', cors(corsOptions), function(req, res) {
		// http://localhost:8066/api/finduser?uname=bawo&pword=oyowe
		console.log(req.query.uname);
		console.log(req.query.pword);
		User.find({
			"username": req.query.uname,
			"password": req.query.pword
		}, function(err, users) {
		  if (err) throw err;
		  console.log(users);
		  res.json({
		  	data: {
		  		"users": users
		  	}
		  });
		});
	});

	// find a specific user details using the username and password - WORKS!
	apiRoutes.get('/finduser/count', cors(corsOptions), function(req, res) {
		// http://localhost:8066/api/finduser/count?uname=bawo&pword=oyowe
		console.log(req.query.uname);
		console.log(req.query.pword);
		User.find({
			"username": req.query.uname,
			"password": req.query.pword
		}, function(err, users) {
		  if (err) throw err;
		  console.log(users);
		  res.json({
		  	data: {
		  		"count": users.length
		  	}
		  });
		});
	});

	apiRoutes.get('/userss', cors(corsOptions), function(req, res) {
		console.log('Querying for the Users list.');
	    res.json({
			data: {
				users: 'users'
			}
		});
	});

	// http://localhost:8066/api/contactus - WORKS!
	// {
	// 	"userid": "12345",
	//     "date": "02/20/2016",
	//     "text: "I will like to access your APi endpoints from my app",
	//     "responded": "No",
	//     "action": "",
	//     "actiondate": ""
	// }
	apiRoutes.post('/contactus', cors(corsOptions), function(req, res) {
		console.log('Contact us note received below.');
		// console.log(req.body.text);
		var acontactus = new ContactUs({
			userid: req.body.userid,
		    date: req.body.date,
		    text: req.body.text,
		    responded: req.body.responded,
		    action: req.body.action,
		    actiondate: req.body.actiondate
		});
		acontactus.save(function(err) {
		  if (err) {
		  	// console.error(err);
		  	console.log('Contact Us entry POST failed!');
		    res.json({ status: 'contact us POST failed' });
		  } else {
		  	console.log('acontactus is saved!');
		  	res.json({
				status: 'OK',
				data: {
					result: 'Contact Us note received successfully'
				}
			});
		  }
		});
	});
	
	apiRoutes.post('/registeruser', cors(corsOptions), function(req, res) {
		// http://localhost:8066/api/registeruser?susr=adetunji&spwd=xebitstudios
		console.log('Registering a new User with specified details: ' + req.query.susr + ', and password: ' + req.query.spwd);
		console.log(req.query.susr);
		console.log(req.query.spwd);
		res.json({
			data: {
				result: 'User created successfully'
			}
		});
	});

	apiRoutes.post('/user/member', cors(corsOptions), function(req, res) {
		// http://localhost:8066/api/user/member/?name=bawo&password=oyowe
		console.log('Querying for the User with specified name: ' + req.query.name + ', and password: ' + req.query.password);
		console.log(req.query.name);
		console.log(req.query.password);
	    User.findOne({
	    	name: req.query.name,
	    	password: req.query.password
	    }, function(err, user) {
	    	console.log('User is: ');
	    	console.log(user);
	    	res.json({
				data: {
					"user": user
				}
			});
	    });
	});

	apiRoutes.get('/user/:id?', cors(corsOptions), function(req, res) {
		console.log('Querying for the User with specified ID.' + req.query.id);
		console.log(req.query.id);
	    User.findOne({
	    	_id: req.query.id
	    }, function(err, user) {
	    	console.log('User is: ');
	    	console.log(user);
	    	res.json({
				data: {
					"user": user
				}
			});
	    });
	});

	apiRoutes.delete('/user/:id?', cors(corsOptions), function(req, res) {
		console.log('Deleting for the User with specified ID.' + req.query.id);
		console.log(req.query.id);
	    User.remove({
	    	_id: req.query.id
	    }, function(err, user) {
	    	console.log('User deleted successfully.');
	    	res.json({
				data: {
					"status": 200,
					"reason": 'User deleted successfully.'
				}
			});
	    });
	});

	apiRoutes.put('/user/:id?', cors(corsOptions), function(req, res) {
		console.log('Updating the User with specified ID.' + req.query.id);
		console.log(req.query.id);
		console.log(req.body.name);
	    User.findOneAndUpdate({
	    	_id: req.query.id
	    }, {
	    	name: req.body.name + ' Sr'
	    }, function(err, user) {
	    	console.log('User is: ');
	    	console.log(user);
	    	res.json({
				data: {
					"status": 200,
					"user": user
				}
			});
	    });
	});

	apiRoutes.post('/user', cors(corsOptions), function(req, res) {
		console.log('Adding a User with POST');
		var newUser = new User({ 
			name: 'Yemisi', 
			password: 
			'yemisipwd'
		});
		newUser.save(function(err) {
		    if (err) throw err;
		    console.log('newUser successfully updated!');
		    res.json({
				data: {
					"user": newUser
				}
			});
		});
	});
};