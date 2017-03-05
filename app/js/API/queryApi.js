module.exports = function(app, port, rootPath, apiRoutes) {
	console.log('rootPath is: ' + rootPath);
	var _ = require('underscore');
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	// var jwt = require('jsonwebtoken'); // used to create, sign and verify tokens
	var config = require('../config');  // get our config file
	var User = require(rootPath + '/app/js/models/user'); // get our mongoose model

	// mongoose.connect(config.database); // connect to DB

	// var db = mongoose.connection;
	 
	// db.on('error', function (err) {
	// 	console.log('connection error', err);
	// });

	// db.once('open', function () {
	// 	console.log('SSCEexams DB is now connected.');
	// });

	app.set('superSecret', config.secret); // secret variable

	// apply the routes to our application with the prefix /api
	app.use('/api', apiRoutes);

	
	// route to return all users (GET http://localhost:8010/api/users)
	// list all users, this route is protected and will require a token
	// // var users = ['TJ', 'Micah'];
	// apiRoutes.get('/users', function (req, res) {
	//     User.find({}, function(err, users) {
	//     	console.log('Users list is: ');
	//     	console.log(users);
	//     	// res.join(users);
	//     	res.send(users);
	//     });
	// });

	// Route for getting the Analytics 'Recent Exam Attempts' panel data
	app.get('/analytics/{userid}/rea', function(req, res) {
		res.json({
			data: {
				name: 'John Adams',
				subjects: [
					{
						subject: 'Mathematics',
						year: '1998',
						percent: '100',
						slot: 'Thur 1/27/2017 10:52am'
					},
					{
						subject: 'Mathematics',
						year: '1990',
						percent: '68',
						slot: 'Tues 1/25/2017 2:12pm'
					},
					{
						subject: 'Physics',
						year: '2013',
						percent: '32',
						slot: 'Mon 1/24/2017 1:22pm'
					},
					{
						subject: 'English',
						year: '2014',
						percent: '98',
						slot: 'Mon 1/24/2017 4:42pm'
					},
					{
						subject: 'Biology',
						year: '2015',
						percent: '84',
						slot: 'Mon 1/24/2017 5:32pm'
					},
					{
						subject: 'Mathematics',
						year: '1998',
						percent: '100',
						slot: 'Thur 1/27/2017 10:52am'
					},
					{
						subject: 'Economics',
						year: '2013',
						percent: '81',
						slot: 'Tues 1/25/2017 4:38pm'
					},
					{
						subject: 'Physics',
						year: '2013',
						percent: '75',
						slot: 'Tues 1/25/2017 6:10pm'
					}
				],
			}
		});
	});

	// getting the 8 data panel box statistics
	apiRoutes.get('/analytics/{userid}/stats', function(req, res) {
		res.json({
			data: {
				countstats: {
					ascs: 12,
					asclw: 26,
					adsh: 4.2,
					uip: 76.2
				},
				subjstats: [
					{
						subject: 'Mathematics',
						attempts: 25,
						avgscore: 78
					},
					{
						subject: 'Physics',
						attempts: 48,
						avgscore: 92
					},
					{
						subject: 'Chemistry',
						attempts: 17,
						avgscore: 72
					},
					{
						subject: 'Economics',
						attempts: 12,
						avgscore: 86
					}
				]
			}
		});
	});

	// chart 1
	apiRoutes.get('/analytics/{userid}/chart1/{yr}/{subj}', function(req, res) {
		res.json({
			data: {}
		});
	});

	// chart 2
	apiRoutes.get('/analytics/{userid}/chart2/{yr}/{mth}', function(req, res) {
		res.json({
			data: {}
		});
	});

	// chart 3
	apiRoutes.get('/analytics/{userid}/chart3/{yr}', function(req, res) {
		res.json({
			data: {}
		});
	});

	// chart 4
	apiRoutes.get('/analytics/{userid}/chart4/{topnum}', function(req, res) {
		res.json({
			data: {}
		});
	});

	// chart 5
	apiRoutes.get('/analytics/{userid}/chart5/{subj}', function(req, res) {
		res.json({
			data: {}
		});
	});

	// chart 6
	apiRoutes.get('/analytics/{userid}/chart6/{subj}', function(req, res) {
		res.json({
			data: {}
		});
	});

	//
	// apiRoutes.get('/analytics/{userid}/rea', function(req, res) {
	// 	res.json({
	// 		data: {}
	// 	});
	// });




};