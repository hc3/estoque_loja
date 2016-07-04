// set up ===================================================================================================
var express        = require('express');
var morgan         = require('morgan');                         // log requests to the console (express4)
var bodyParser     = require('body-parser');                    // pull information from HTML POST (express4)
var methodOverride = require('method-override');                // simulate DELETE and PUT (express4)
var mongoose       = require('mongoose');                       // mongoose for mongodb
var app            = express();                                 // create our app w/ express
var port  	       = process.env.PORT || 3412; 				    // set the port


// configuration ============================================================================================
app.use(express.static(__dirname + '/public'));                 // set the static files location
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());                                      // simulate DELETE and PUT


// routes ===================================================================================================
var produtoRoute = require('./Routes/produto.js')(app);
var emitenteRoute = require('./Routes/emitente.js')(app);
var movRoute = require('./Routes/movimentacao.js')(app);




// MongoDB configuration ====================================================================================

mongoose.connect('mongodb://localhost/loja', function(err, res) {
	if (err) {
		console.log('error connecting to MongoDB Database. ' + err);
	} else {
		console.log('Connected to Database');
	}
});



// listen (start app with node server.js) ===================================================================
app.listen(port);
console.log('Listenning on port ' + port);