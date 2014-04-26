var express = require('express.io');
var mongoose = require('mongoose');
var app = express();
var ejs = require('ejs');
var email = require('emailjs');
fs = require('fs');
app.http().io();

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
  	console.log('connected to mongo!');
});

var requestsSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	emailAddress: String,
	deliveryDate: Date,
	numberOfCookies: Number,
	additionalInfo: String,
	status: String
});
var userSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	emailAddress: String,
	password: String,
	role: String
});

var CookieRequest = mongoose.model('CookieRequest', requestsSchema);
var User = mongoose.model('User', userSchema);

app.configure(function(){
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	// app.use(express.session({ secret: '*#ll,c0efjxcovnLKJfn1833r' }));
	// app.use(passport.initialize());
	// app.use(passport.session());
	app.set('views', __dirname + '/server/views');
	app.set('view engine', 'ejs');
	app.engine('html', ejs.renderFile);
	app.use(express.static(__dirname + '/public'));
	app.use('/tmpls', express.static(__dirname + '/server/views/tmpls'));
});

/* Express Routes */
app.post('/postContact', function(req, res){
	var thisRequest = new CookieRequest(req.body);
	thisRequest.status = 'New'
	thisRequest.save(function(err, savedRequest){
		if (err) return console.error(err);

        //send email
        sendEmail(thisRequest);

		res.send('success');
		res.end();
	});
});

app.get('/cookieRequests', function(req, res){
	CookieRequest.find({} , function (err, items) {
	      if (err) return console.error(err);
	      res.send(items);
	      res.end();
  	});
});
app.get('/cookie-images', function(req, res){
	var imageFiles = [];
	var dir = '/img/cookies/';
	fs.readdir('public' + dir, function(err, files){
		if (err) return console.error(err);
		files.forEach(function(file) {
			if (file.charAt(0) !== '.'){
		        		file = dir + file;
		        		imageFiles.push(file)
		    	}
   	 	});
   	 	res.send(imageFiles);
		res.end();
	});

});
app.get('/cookieRequests/:id', function(req, res){
	CookieRequest.findOne({_id : req.params.id} , function (err, items) {
	      if (err) return console.error(err);
	      res.send(items);
	      res.end();
  	});
});
app.get('/:view/:id', function(req, res){
	res.sendfile(__dirname + '/server/views/index.html');
});
app.get('/:view', function(req, res){
	res.sendfile(__dirname + '/server/views/index.html');
});

app.get('/', function(req, res){
	res.render('index.html');
});

function sendEmail(thisRequest) {
    var server = email.server.connect({
       user: 'aedballs@gmail.com',
       password: 'd594261B@ll',
       ssl: true,
       host: 'smtp.gmail.com'
    });

    var message = {
        text: 'I hope this works',
        from: thisRequest.emailAddress,
        to: 'aedballs@gmail.com',
        cc: 'ksc4130@gmail.com',
        subject: 'Testing Emailing From Node'
    }

    server.send(message, function(err) {
       if (err) console.error(err);
    });
}
/* End Routes */

/* Authentication Logic */
// passport.use(new LocalStrategy(
//   	function(username, password, done) {
//     		User.findOne({ username: username }, function (err, user) {
//       			if (err) {
// 				return done(err);
//       			}
//       			if (!user) {
// 		        		return done(null, false, { message: 'Incorrect username.' });
// 		      	}
//       			if (!user.validPassword(password)) {
//         				return done(null, false, { message: 'Incorrect password.' });
//       			}
// 			return done(null, user);
// 		});
//   	}
// ));

// passport.serializeUser(function(user, done) {
// 	done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
// 	User.findById(id, function(err, user) {
// 		done(err, user);
// 	});
// });

// var auth = function(req, res, next)
// {
// 	if (!req.isAuthenticated())
// 		res.send(401);
// 	else
// 		next();
// };
/* End Authentication */

app.listen('8080');
