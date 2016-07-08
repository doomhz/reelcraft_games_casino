let fs        = require("fs")
let path      = require("path")
let Sequelize = require("sequelize")
let lodash    = require("lodash")

let db = {}
let auth = GLOBAL.config.mysql;

let sequelize = new Sequelize(auth.database, auth.user, auth.password, {
  dialect: "mysql",
  port: auth.port,
  host: auth.host,
  logging: auth.logging,
  define: {
    underscored: true,
    freezeTableName: false,
    charset: "utf8",
    collate: "utf8_general_ci",
    timestamps: true
  }
})

fs.readdirSync(__dirname).filter(
  file => { return (file.indexOf(".js") !== -1) && (file !== "index.js") }
).forEach(
  file => { let model = sequelize.import(path.join(__dirname, file)); db[model.name] = model; }
)

exports = module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db)


