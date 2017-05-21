module.exports = function(app, port, rootPath, apiRoutes) {
	console.log('just entered Log ingestion and queryApi');
	var _ = require('underscore');
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	// Log ingestion and query APIs
	apiRoutes.post('/ingestlogs', function(req, res) {
		console.log('Registering a new User with specified details: ' + req.query.susr + ', and password: ' + req.query.spwd);
		console.log('req.body.userid is: ' + req.body.userid);
		console.log('req.body.val is: ' + req.body.val);
		res.json({
			data: {
				status: 'OK'
			}
		});
	});
};