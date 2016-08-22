![alt tag](https://github.com/sukisuso/FullStackLogger/blob/master/view/resources/logo.png)

### Node Js module to debug your Javascript full stack project.
`
	# npm install --save fullstacklogger
`
##### You can use it in your NodeJs Server.

	var express = require('express');
	var app = express();
	var server = app.listen(3000);

	var LOGGER = require ('fullstacklogger')(server);

	app.use(express.static(__dirname));
	app.get('/', function(req, res){
		LOGGER.info('File Sended to client');
	  	res.sendFile(__dirname + '/index.html');
	});

	app.post('/log/ejemplo', function(req, res) {
		LOGGER.debug('CALL - POST');
	});	

	LOGGER.info('info - Server Running');

##### Or import the cliente and use it at the browser.

	<script src="/fslogger-client.js"></script>

	<body>
		<h2>Full Stack Logger</h2>

		<script>
			$.ajax({
			  type: "POST",
			  url: '/log/ejemplo'
			});

			fsLogger.trace('Welcome');
			fsLogger.debug('To');
			fsLogger.info('Full');
			fsLogger.warn('Stack');
			fsLogger.error('Logger!! Lets Start');
		</script>
	</body>

##### Author
`
 Jesus Juan Aguilar - 2016 - jesusjuanaguilar@gmail.com
`