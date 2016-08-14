/**
*	Jesús Juan Aguilar -- Full Stack Logger 
*	08/2016
*   Logger
*/
var fs = require('fs');
var RED = '\x1b[31m';
var YELLOW = '\x1b[33m';
var BLUE = '\x1b[36m';
var GREEN = '\x1b[32m';
var MAG = '\x1b[35m';
var DEFAULT = '\x1b[0m';
var URL_SERVER = './log/serverlog.log';
var URL_CLIENT = './log/clientlog.log';
var RETURN = "\n";
var OUTPUTLEVEL;

module.exports = function(oLevel) {

	//Output Log path
	if (!fs.existsSync('./log')){
		fs.mkdirSync('./log');
	}

	OUTPUTLEVEL = oLevel || 2;
	var fsLogger = {};
	
	fsLogger['trace'] = function(msg){
		if(OUTPUTLEVEL <=0){
			log(MAG, parseMsg(msg, 'TRACE'), true);
		}
	};

	fsLogger['debug'] = function(msg){
		if(OUTPUTLEVEL <=1){
			log(GREEN, parseMsg(msg, 'DEBUG'), true);
		}
	};

	fsLogger['info'] = function(msg){
		if(OUTPUTLEVEL <=2){
			log(BLUE, parseMsg(msg, 'INFO '), true);
		}
	};

	fsLogger['warn'] = function(msg){
		if(OUTPUTLEVEL <=3){
			log(YELLOW, parseMsg(msg, 'WARN '), true);
		}
	};

	fsLogger['error'] = function(msg){
		if(OUTPUTLEVEL <=4){
			log(RED, parseMsg(msg, 'ERROR'), true);
		}
	};

	fsLogger['client'] = function (level , msg){
		logClient (msg, level);
	};

	return fsLogger;
}

function log (color, text, file){
	console.log(color, text ,DEFAULT);
	jPersistance (file?URL_SERVER:URL_CLIENT, text);
}

function parseMsg(msg , level){
	return (new Date()).toLocaleString()+' # '+level+'             | '+ msg;
}

function parseMsgClient(msg , level){
	return (new Date()).toLocaleString()+' # ClientLog # '+level+' | '+ msg;
}

function logClient (msg, level){

	if(level == 'trace' && OUTPUTLEVEL<=0){
		log(MAG, parseMsgClient(msg, 'TRACE', false));
	} else if(level == 'debug' && OUTPUTLEVEL<=1){
		log(GREEN, parseMsgClient(msg, 'DEBUG', false));
	}else if(level == 'info' && OUTPUTLEVEL<=2){
		log(BLUE, parseMsgClient(msg, 'INFO ', false));
	}else if(level == 'warn' && OUTPUTLEVEL<=3){
		log(YELLOW, parseMsgClient(msg, 'WARN ', false));
	}else if(level == 'error' && OUTPUTLEVEL<=4){
		log(RED, parseMsgClient(msg, 'ERROR', false));
	}
} 

/*
* Function to Persist all the logs!.
*/
function jPersistance (file, msg){
	
	//File persistance
	var stream = fs.createWriteStream(file, {'flags': 'a'});
	stream.once('open', function(fd) {
	  stream.write(msg+RETURN);
	  stream.end();
	});
}