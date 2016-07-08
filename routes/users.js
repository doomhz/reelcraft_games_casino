import _ from "underscore"

let getCurrentPlayer = function (req) {
  let currency = req.body.currency
  let sessionPlayer = req.session.player

  if (sessionPlayer) {

    return GLOBAL.db.Player.loadFromString(sessionPlayer)
    .then( player => {
      if (player.currency === currency)
        return player
      else
        return GLOBAL.db.Player.createNew(currency)
        .then ( player => {
          req.session.player = JSON.stringify(player.dataValues)
          return player
        })
    })

  } else {

    return GLOBAL.db.Player.createNew(currency)
    .then ( player => {
      req.session.player = JSON.stringify(player.dataValues)
      return player
    })

  }
}


export function routes(app) {
  app.post("/user", function (req, res) {
    getCurrentPlayer(req).then(res.json.bind(res))
  })

  app.get("/user", function (req, res) {
    getCurrentPlayer(req).then(res.json.bind(res))
  })

  app.put("/user", function (req, res) {
    getCurrentPlayer(req).then(res.json.bind(res))
  })

  app.delete("/user", function (req, res) {
    getCurrentPlayer(req)
    .then( player => {
      GLOBAL.db.Player.destroy({where: {id: player.id}})
      .then( affectedRows => {
        req.session.player = null
        res.json({affectedRows: affectedRows})
      })
    })
  })
}