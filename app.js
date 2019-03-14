
var express = require('express');
var session = require('express-session');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var path = require('path');
var loginfn = require('./login.js');

var app = express();

app.use(express.static(__dirname + '/views/imgs'));

// For Handlebars

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        foo: function () { return 'FOO!'; },
        bar: function () { return 'BAR!'; }
    }
});

app.get('/', function (req, res) {
	
	res.render('index', {
			showUser: false,
			
			helpers: {
				foo: function() { return 'foo.'}
			}
		});
	});


app.get('/login', function (req, res) {
    res.render('login');
});

app.get('/register', function (req, res) {
    res.render('register');
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

/*app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/login', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/register', function(request, response) {
	response.sendFile(path.join(__dirname + '/register.html'));
}); */

app.post('/auth', loginfn );

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.post('/submit-registration', function(request, response) {
	var username = request.body.username;
	var fullname = request.body.fullname;
	var email = request.body.email;
	var password = request.body.password;
	
	connection.query('INSERT INTO accounts (username, fullname, email, password) VALUES("' + [username] + '","' + [fullname] + '","' + [email] + '","' + [password] + '")');
	
	response.redirect('/');
});

app.listen(3000);

