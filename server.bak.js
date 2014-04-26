var express = require('express.io');
var app = express();
var ejs = require('ejs');

app.http().io();
app.set('views', '/server/views');
app.set('public', '../public/');
app.use('client', express.static('../public'));

app.use(express.bodyParser());
app.use(express.methodOverride());

app.engine('html', ejs.renderFile);

/* home page route */
app.get('/:view', function(req,res){
	res.render('tmpls/' + req.params.partialPath);
	res.end();
});
app.listen(8080);