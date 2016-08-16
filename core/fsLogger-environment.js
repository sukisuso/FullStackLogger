/**
*	Jesús Juan Aguilar -- Full Stack Logger 
*	08/2016
*   Environment
*/
var PATH_DB = "./data/db/fslogger";

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

	var Datastore = require('nedb')
  	, db = new Datastore({ filename: PATH_DB, autoload: true });
  	logger.setDb(db);

	return app;
}