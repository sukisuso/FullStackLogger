/**
*	Jesús Juan Aguilar -- Full Stack Logger 
*	08/2016
*   Example of Node Server with Full Stack Logger
*/

var express = require('express');
var app = express();
var server = app.listen(3000);
var LOGGER = require ('../../index.js')(server);

app.use(express.static(__dirname));
app.disable('x-powered-by');

app.get('/', function(req, res){
	LOGGER.info('File Sended to client');
  	res.sendFile(__dirname + '/index.html');
});

app.post('/log/ejemplo', function(req, res) {
	LOGGER.debug('CALL - POST');
});	

LOGGER.info('info - Server Running');
