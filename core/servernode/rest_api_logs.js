/**
* CRUD Logs - REST
* Jesus Juan Aguilar. 2016 - jesusjuanaguilar@gmail.com
*/
var PAGE_SIZE = 19;
var db = null;

function StartPaths(app, datab){
	
	db = datab;

	app.post('/logger/getFirstClientLogs', function(req, res) {getFirstClientLogs(req,res);});
	app.post('/logger/getPageClientLogs', function(req, res) {getPageClientLogs(req,res);});
	app.post('/logger/getFirstServerLogs', function(req, res) {getFirstServerLogs(req,res);});
	app.post('/logger/getPageServerLogs', function(req, res) {getPageServerLogs(req,res);});
}

function getFirstClientLogs(req, res) {

	db.find({ isClient: true }).sort({date:-1}).limit(PAGE_SIZE).exec(function (err, docs) {
	  if (err != null){
	  	console.log(err);
	  }
	  	res.send(docs);
		res.end();
	});
}
						
function getFirstServerLogs(req, res) {
	db.find({ isClient: false }).sort({date:-1}).limit(PAGE_SIZE).exec(function (err, docs) {
	  if (err != null){
	  	console.log(err);
	  }
	  	res.send(docs);
		res.end();
	});
}

function getPageClientLogs(req, res) {
	var page =  req.body.page * PAGE_SIZE;

	db.find({ isClient: true }).sort({date:-1}).skip(page).limit(PAGE_SIZE).exec(function (err, docs) {
	  if (err != null){
	  	console.log(err);
	  }
	  	res.send(docs);
		res.end();
	});
}

function getPageServerLogs(req, res) {
	var page =  req.body.page * PAGE_SIZE;

	db.find({ isClient: false }).sort({date:-1}).skip(page).limit(PAGE_SIZE).exec(function (err, docs) {
	  if (err != null){
	  	console.log(err);
	  }
	  	res.send(docs);
		res.end();
	});
}

exports.startPaths = StartPaths;