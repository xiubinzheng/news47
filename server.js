var express = require('express');
var path = require('path');
var logger = require('morgan'); // http request logging
var bodyParser = require('body-parser'); // accessing the http request body
var cp = require('child_process'); 
var responseTime = require('response-time'); // performance logging
var helmet = require('helmet');
var RateLimit = require('express-rate-limit');

/*
var config = require('./config');
var users = require('./routes/users');
var session = require('./routes/sessions');
var sharedNews = require('./routes/sharedNews');
*/
var app =  express();
app.enable('trust proxy');

// Express middleware module linkage
var limiter = new RateLimit({
    windowMs: 15*60*1000,
    max:100,
    delayMs: 0
});

app.use(limiter);
app.use(helmet());

app.use(helmet.csp({
    directives:{
        defaultSrc:["self"],
        scriptSrc:["self","'unsafe-inline'",'maxcdn.bootstrapcdn.com'],
        fontSrc:["'self'",'maxcdn.bootstrapcdn.com'],
        imgSrc:['*']
    }
}));

app.get('/',function(req,res){
    console.log('Send message on get request');
    res.send('hello there developer');
});

app.set('port',process.env.port || 3000);

var server = app.listen(app.get('port'),function(){
    console.log('Server listening on port: '+server.address().port);
});

