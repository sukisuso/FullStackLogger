/**
*	Jesús Juan Aguilar -- Full Stack Logger 
*	08/2016
*   Socket
*/

module.exports = function (server,LOGGER){

	var io = require('socket.io').listen(server);

	io.on('connection', function(socket){
	    
	    LOGGER.client('trace', 'Client connected: '+   socket.request.connection.remoteAddress);

		socket.on('log', function(msg){
			var  msgAux = JSON.parse(msg);
			LOGGER.client(msgAux.level, msgAux.message);
		});
		 
		socket.on('disconnect', function () {
			LOGGER.client('trace', 'Client disconnected: '+   socket.request.connection.remoteAddress);
		});
	});
}