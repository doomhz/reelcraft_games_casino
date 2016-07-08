let fs          = require('fs')
let environment = process.env.NODE_ENV || 'test'

if (!GLOBAL.config) {
  GLOBAL.config = require(`${process.cwd()}/config/app`)[environment]
  GLOBAL.db     = require(`${process.cwd()}/models/mysql/index`)
}

before(function(done) {
  this.timeout = 5000
  GLOBAL.db.sequelize.sync({force: true}).then(() => done()).error(() => done())
})