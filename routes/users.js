import _ from "underscore"

let createNewPlayer = function (req) {
  return GLOBAL.db.Player.createNew()
  .then( player => {
    req.session.player = JSON.stringify(player.dataValues)
    return player
  })
}

let getCurrentPlayer = function (req) {
  return GLOBAL.db.Player.loadFromString(req.session.player)
}

let changePlayerCurrency = function (req) {
  let currency = req.body.currency || "free"
  return GLOBAL.db.Player.loadFromString(req.session.player)
  .then( player => {
    let options = {
      where: {
        uid: player.uid,
        username: player.username,
        currency: currency
      },
      defaults: {
        balance: 100000000000
      }
    }
    return GLOBAL.db.Player.findOrCreate(options)
  }).spread( (player, created) => {
    req.session.player = JSON.stringify(player.dataValues)
    return player
  })
}

let deleteCurrentPlayer = function (req) {
  return GLOBAL.db.Player.loadFromString(req.session.player)
  .then( player => {
    req.session.player = null
    return GLOBAL.db.Player.destroy({where: {uid: player.uid}})
  })
}

export function routes(app) {
  app.post("/user", function (req, res) {
    createNewPlayer(req).then(res.json.bind(res))
  })

  app.get("/user", function (req, res) {
    if (!req.session.player) return res.json({})
    getCurrentPlayer(req).then(res.json.bind(res))
  })

  app.put("/user", function (req, res) {
    if (!req.session.player) return res.json({})
    changePlayerCurrency(req).then(res.json.bind(res))
  })

  app.delete("/user", function (req, res) {
    if (!req.session.player) return res.json({})
    deleteCurrentPlayer(req).then(res.json.bind(res))
  })
}