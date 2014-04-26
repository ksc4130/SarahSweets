var passport = require('passport');
var localStrategy = require('passport-local');

passport.use(new LocalStrategy(
  	function(username, password, done) {
    		User.findOne({ username: username }, function (err, user) {
      			if (err) {
				return done(err);
      			}
      			if (!user) {
		        		return done(null, false, { message: 'Incorrect username.' });
		      	}
      			if (!user.validPassword(password)) {
        				return done(null, false, { message: 'Incorrect password.' });
      			}
			return done(null, user);
		});
  	}
));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

var auth = function(req, res, next)
{
	if (!req.isAuthenticated())
		res.send(401);
	else
		next();
};

module.exports('authorization');