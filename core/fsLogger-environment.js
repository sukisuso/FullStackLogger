/**
*	Jesús Juan Aguilar -- Full Stack Logger 
*	08/2016
*   Environment
*/

module.exports = function (path, server, logger) {

	var express = require('express');
	var bodyParser = require('body-parser');
	var helmet = require('helmet');
	var app = express();
	var http = require('http').Server(app);

	require('./fsLogger-socket')(server, logger);

	app.use(express.static(path + '/view'));
	app.use(helmet());
	app.disable('x-powered-by');
	app.use( bodyParser.json() );  
	app.use(bodyParser.urlencoded({     
	  extended: true
	}));

	return app;
}