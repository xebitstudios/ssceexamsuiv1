'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

module.exports.create = (event, context, callback) => {
	const timestamp = new Date().getTime();
	const data = JSON.parse(event.body);
	console.log('create student data', data);

	if (typeof data.firstname === '') {
		console.error('Firstname Validation Failed');
		callback(new Error('Couldn\'t create the student item.'));
		return;
	}

	if (typeof data.lastname === '') {
		console.error('Lastname Validation Failed');
		callback(new Error('Couldn\'t create the student item.'));
		return;
	}

	const params = {
		TableName: 'schoollabs-dev',
		Item: {
			id: uuid.v1(),
			firstname: data.firstname,
			lastname: data.lastname,
			isActive: true,
			createdAt: timestamp,
			updatedAt: timestamp
		}
	}

	dynamoDb.put(params, (error, result) => {
		if (error) {
			console.error(error);
			callback(new Error('Couldn\'t create the student item.'));
			return;
		}

		console.log('new student detail is: ', result);

		const response = {
			statusCode: 200,
			body: JSON.stringify(result.Item)
		}
		callback(null, response);
	})
}

module.exports.update = (event, context, callback) => {
	const timestamp = new Date().getTime();
	const data = JSON.parse(event.body);
	console.log('updated student data', data);

	if (typeof data.firstname === '') {
		console.error('Firstname Validation Failed');
		callback(new Error('Couldn\'t update the student item.'));
		return;
	}

	if (typeof data.lastname === '') {
		console.error('Lastname Validation Failed');
		callback(new Error('Couldn\'t update the student item.'));
		return;
	}

	const params = {
		TableName: 'schoollabs-dev',
		Item: {
			id: event.pathParameters.id,
			firstname: data.firstname,
			lastname: data.lastname,
			isActive: data.isActive,
			updatedAt: timestamp
		}
	}

	dynamoDb.put(params, (error, result) => {
		if (error) {
			console.error(error);
			callback(new Error('Couldn\'t update the student item.'));
			return;
		}

		console.log('updated student detail is now: ', result);

		const response = {
			statusCode: 200,
			body: JSON.stringify(result.Item)
		}
		callback(null, response);
	})
}

module.exports.list = (event, context, callback) => {
	const params = {
		TableName: 'schoollabs-dev'
	}

	dynamoDb.scan(params, (error, result) => {
		if (error) {
			console.error(error);
			callback(new Error('Couldn\'t fetch the students.'));
			return;
		}

		console.log('student list is: ', result);

		const response = {
			statusCode: 200,
			body: JSON.stringify(result.Items)
		}
		callback(null, response);
	})
}

module.exports.get = (event, context, callback) => {
	const params = {
		TableName: 'schoollabs-dev',
		Key: {
			id: event.pathParameters.id
		}
	}

	dynamoDb.get(params, (error, result) => {
		if (error) {
			console.error(error);
			callback(new Error('Couldn\'t fetch the specific student.'));
			return;
		}

		console.log('student detail is: ', result);

		const response = {
			statusCode: 200,
			body: JSON.stringify(result.Item)
		}
		callback(null, response);
	})
}

module.exports.delete = (event, context, callback) => {
	const params = {
		TableName: 'schoollabs-dev',
		Key: {
			id: event.pathParameters.id
		}
	}

	dynamoDb.delete(params, (error) => {
		if (error) {
			console.error(error);
			callback(new Error('Couldn\'t delete the specific student.'));
			return;
		}

		console.log('student detail deleted successfully');

		const response = {
			statusCode: 200,
			body: JSON.stringify({})
		}
		callback(null, response);
	})
}

module.exports.getrecords = (event, context, callback) => {
	const params = {
		TableName: 'schoollabs-dev',
		Key: {
			id: event.pathParameters.id
		},
		KeyConditionExpression : 'id = :id', 
	    FilterExpression : '#lastname= :lastname',
	     ExpressionAttributeNames : {
	        '#lastname' : 'lastname'
	    },
	    ExpressionAttributeValues : {
	        ':id' : event.pathParameters.id,
	        ':lastname' : event.pathParameters.lastname
	    }
	}

	dynamoDb.query(params, (error, result) => {
		if (error) {
			console.error(error);
			callback(new Error('Couldn\'t fetch complex specific student.'));
			return;
		}

		console.log('complex student detail is: ', result);

		const response = {
			statusCode: 200,
			body: JSON.stringify(result.Items)
		}
		callback(null, response);
	})
}
