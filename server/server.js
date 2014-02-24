var express = require('express.io');
var app = express();

app.http().io();

app.get('/', function(req, res) {
	res.send('hello...fucker');
});

app.listen(8080);