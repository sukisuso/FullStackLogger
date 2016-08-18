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

	if (options == undefined){
		options = {};
	}

	PORT = options.loggerPort || PORT;

	var fsLogger = require('./core/fsLogger')(changeOutputLevel(options.outputlevel), options.filePersistance);
	var server = require('./core/fsLogger-environment')(__dirname, server, fsLogger);
	router.redirect(server.app, server.db);
	server.app.listen(PORT);

return fsLogger;
} 


function changeOutputLevel (level){
	if(level == undefined){
		return null;
	}

	if(level == 'trace'){
		return 1;
	}else if (level == 'debug'){
		return 2;
	}else if (level == 'info'){
		return 3;
	}else if (level == 'warn'){
		return 4;
	}else if (level == 'error'){
		return 5;
	}else {
		return null;
	}

}