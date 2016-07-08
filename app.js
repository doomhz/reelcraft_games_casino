require('babel-register')

var express           = require('express')
var session           = require('express-session')
var MySQLStore        = require('express-mysql-session')(session);
var bodyParser        = require('body-parser')
var methodOverride    = require('method-override')
var cookieParser      = require('cookie-parser')
var compression       = require('compression')
var errorhandler      = require('errorhandler')
var http              = require('http')
var environment       = process.env.NODE_ENV || 'development'


require('date-utils')

// Configure globals
GLOBAL.config = require('./config/app')[environment]
GLOBAL.db     = require("./models/mysql/index")

// Setup express
var app = express()
var cookieParser  = cookieParser(GLOBAL.config.session.cookie_secret)
var sessionStore = new MySQLStore(GLOBAL.config.mysql)
app.enable("trust proxy")
app.disable('x-powered-by')
app.set('port', process.env.PORT || 7000)
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')
app.use(compression())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(cookieParser)
app.use(session({
  name:              GLOBAL.config.session.session_key,
  secret:            GLOBAL.config.session.cookie_secret,
  store:             sessionStore,
  proxy:             true,
  cookie:            GLOBAL.config.session.cookie,
  saveUninitialized: true,
  resave:            true
}))
app.use(express.static(__dirname + '/public', {maxAge: 2592000000})) // 30 days
app.use(function(err, req, res, next) {
  if (err.status === 400) {
    res.statusCode = 404
    res.render("errors/404")
  } else {
    console.log("503 - [" + req.method + "] " + req.originalUrl + " - " + err + " - " + JSON.stringify(req.headers) + " " + JSON.stringify(req.body), "error", {rollbar: false, console: false, file: true})
    res.statusCode = 503
    res.render("errors/500")
  }
})


// Routes
require('./routes/site').routes(app)
require('./routes/users').routes(app)
require('./routes/errors').routes(app)


// Configuration
if (environment === "dev") {
  app.use(errorhandler({ dumpExceptions: true, showStack: true }))
}
if (environment === "production") {
  app.use(errorhandler())
}

app.listen(app.get('port'), function(){
  console.log("Reelcraft Games Casino is running on port " + app.get("port") + " in " + app.settings.env + " mode", "info")
})