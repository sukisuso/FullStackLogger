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
var db = null;
var OUTPUTLEVEL;
var FILEPERSISTANCE;

module.exports = function(oLevel, fileperst) {

	OUTPUTLEVEL = oLevel || 0;
	FILEPERSISTANCE = fileperst || false;

	//Output Log path
	if (!fs.existsSync('./log') && FILEPERSISTANCE){
		fs.mkdirSync('./log');
	}	

	var fsLogger = {};
	
	fsLogger['trace'] = function(msg){
		if(OUTPUTLEVEL <=0){
			log(MAG, parseMsg(msg, 'TRACE'), true, 'TRACE');
		}
	};

	fsLogger['debug'] = function(msg){
		if(OUTPUTLEVEL <=1){
			log(GREEN, parseMsg(msg, 'DEBUG'), true, 'DEBUG');
		}
	};

	fsLogger['info'] = function(msg){
		if(OUTPUTLEVEL <=2){
			log(BLUE, parseMsg(msg, 'INFO '), true, 'INFO');
		}
	};

	fsLogger['warn'] = function(msg){
		if(OUTPUTLEVEL <=3){
			log(YELLOW, parseMsg(msg, 'WARN '), true, 'WARN');
		}
	};

	fsLogger['error'] = function(msg){
		if(OUTPUTLEVEL <=4){
			log(RED, parseMsg(msg, 'ERROR'), true, 'ERROR');
		}
	};

	fsLogger['client'] = function (level , msg){
		logClient (msg, level);
	};

	fsLogger['setDb']= function (dataBase){
		db = dataBase;
	};

	fsLogger['getDb']= function (){
		return db;
	};

	return fsLogger;
}

function log (color, text, file, level){
	console.log(color, text ,DEFAULT);
	jPersistance (file?URL_SERVER:URL_CLIENT, text, level);
}

function parseMsg(msg , level){
	return (new Date()).toLocaleString()+' # '+level+'             | '+ msg;
}

function parseMsgClient(msg , level){
	return (new Date()).toLocaleString()+' # ClientLog # '+level+' | '+ msg;
}

function logClient (msg, level){

	if(level == 'trace' && OUTPUTLEVEL<=0){
		log(MAG, parseMsgClient(msg, 'TRACE'), false, 'TRACE');
	} else if(level == 'debug' && OUTPUTLEVEL<=1){
		log(GREEN, parseMsgClient(msg, 'DEBUG'), false, 'DEBUG');
	}else if(level == 'info' && OUTPUTLEVEL<=2){
		log(BLUE, parseMsgClient(msg, 'INFO '), false, 'INFO');
	}else if(level == 'warn' && OUTPUTLEVEL<=3){
		log(YELLOW, parseMsgClient(msg, 'WARN '), false, 'WARN');
	}else if(level == 'error' && OUTPUTLEVEL<=4){
		log(RED, parseMsgClient(msg, 'ERROR'), false, 'ERROR');
	}
} 

/*
* Function to Persist all the logs!.
*/
function jPersistance (file, msg, levelToSave){
	
	//File persistance
	if(FILEPERSISTANCE != false){
		var stream = fs.createWriteStream(file, {'flags': 'a'});
		stream.once('open', function(fd) {
		  stream.write(msg+RETURN);
		  stream.end();
		});
	}

	//Embedded database persistance
	if(db != null){
		var doc = { 
			level: levelToSave
            , content: msg
            , date: new Date()
            , isClient: file==URL_SERVER?false:true
        };

		db.insert(doc);
	}
}