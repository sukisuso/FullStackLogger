/**
*	Jesús Juan Aguilar -- Full Stack Logger 
*	08/2016
*   Module file.
*/
var PORT = 60000;
var router = require('./core/fsLogger-router');



module.exports = function (server, options){
	/* Options.
	* loggerPort: default 60000
	* outputlevel: ['trace', 'debug', 'info', 'warn', 'error']
	* filePersistance: default false
	*/

	var fsLogger = require('./core/fsLogger')();
	var server = require('./core/fsLogger-environment')(__dirname, server, fsLogger);
	router.redirect(server.app, server.db);
	server.app.listen(PORT);

return fsLogger;
} 


