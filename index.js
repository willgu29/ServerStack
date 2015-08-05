var express = require('express'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser');
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	session = require('express-session'),
	config = require('./config.json'),
	User = require('./models/User.js');

var app = express();

app.set('views', __dirname + '/templates/views/');
app.set('view engine', 'hbs');

app.use(bodyParser());
app.use(cookieParser());
app.use(session({secret: 'baeMaxLoving'}))
app.use(passport.initialize());
app.use(passport.session());

app.use("/public/js/react-0.13.3/build", express.static(__dirname + "/public/js/react-0.13.3/build"));
app.use("/public/style", express.static(__dirname + '/public/style'));
app.use("/client/build", express.static(__dirname + '/client/build'));
app.use("/public/js/jquery", express.static(__dirname + '/public/js/jquery'));
app.use("/public/imgs", express.static(__dirname + '/public/imgs'));

app.listen(config.PORT || 3000);


//**********************************

//ROUTING VIEWS

app.get("/", function (req, res) {
	console.log('/ GET');
	if (!req.user) {
		res.render('landingPage');
	} else {
		res.render('index');
	}
});



//***************



/// MONGOOOSE Database Linking ****

var mongoose = require('mongoose');

var connectDBLink;

if (config.NODE_ENV == "production") {
  connectDBLink = config.MONGO_DB;
} else if (config.NODE_ENV == "development") {
	connectDBLink = config.MONGO_DB;
} else {
	connectDBLink = config.MONGO_DB;
}

mongoose.connect(connectDBLink);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
	console.log("DB opened");
});

//***********************

/////PASSPORT Session///////////////

passport.use(new LocalStrategy({
		usernameField: "email",
		passwordField: "password"
	},
	function (email, password, done) {
		User.findOne({email: email}, function (err, user) {
			if (err) {return done(err);}
			if (!user) {
				console.log("Incorrect email");
       			return done(null, false, { message: 'Incorrect email.' });
      		}
      		if (!(user.password == password)) {
      			console.log("Incorrect password");
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
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//*************************
