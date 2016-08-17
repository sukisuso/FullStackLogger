/**
*	Jesús Juan Aguilar -- Full Stack Logger 
*	08/2016
*   Router
*/
var logs = require('./servernode/rest_api_logs');

function route(app, db) {
	
	app.get('/', function(req, res) {
		res.sendFile(__dirname + '/index.html');
		res.end();
	});

	logs.startPaths(app , db);
}

exports.redirect = route;