# what kind of sorcery is this?
require("coffee-script").register()
require('babel-register')

environment   = process.env.NODE_ENV || "development"
GLOBAL.config = require('./config/app')[environment]
GLOBAL.db     = require("./models/mysql/index")

task "db:create_tables", "Create all tables", ()->
  GLOBAL.db.sequelize.sync()
    .then ()->
      console.log "Database sync complete"
    .catch (err)->
      console.error err

task "db:migrate", "Run pending database migrations", ()->