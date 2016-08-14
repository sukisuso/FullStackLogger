/**
*	Jesús Juan Aguilar -- Full Stack Logger 
*	08/2016
*   Router
*/

function route(app) {
	
	app.get('/', function(req, res) {
		res.sendFile(__dirname + '/index.html');
		res.end();
	});

}

exports.redirect = route;