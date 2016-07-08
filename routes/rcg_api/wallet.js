import RcgHelper from "../../lib/rcg_helper"

let rcgHelper = new RcgHelper({config: GLOBAL.config})

let isValidRequest = function (req, res) {
  if (!rcgHelper.verifyHMAC(req.header("x-signature", ""), req.body)) {
    res.status(409).json({error: "Invalid signature"})
    return false
  }
  return true
}

export function routes(app) {
  /**
  * Expected data for each endpoint:
  * {partner_uid: String, player_uid: String, currency: String, token: String, game_round_id: String, game_name: String}
  */
  
  app.post("/rcg_api/get_balance", function (req, res) {
    if (!isValidRequest(req, res)) return
    GLOBAL.db.Player.findByUid(req.body.player_uid)
    .then((player)=> {
      if (!player) return res.status(409).json({error: "Player not found"})
      res.status(200).json({balance: player.balance, currency: player.currency})
    })
    .error((err)=> res.status(409).json({error: err}))
  })

  app.post("/rcg_api/deposit", function (req, res) {
    if (!isValidRequest(req, res)) return
    GLOBAL.db.Player.findByUid(req.body.player_uid)
    .then((player)=> {
      if (!player) return res.status(409).json({error: "Player not found"})
      player.addBalance(req.body.amount)
      .then((player)=> res.status(200).json({balance: player.balance, currency: player.currency}) )
      .error((err)=> res.status(409).json({error: err}))
    })
    .error((err)=> res.status(409).json({error: err}))
  })

  app.post("/rcg_api/withdraw", function (req, res) {
    if (!isValidRequest(req, res)) return
    GLOBAL.db.Player.findByUid(req.body.player_uid)
    .then((player)=> {
      if (!player) return res.status(409).json({error: "Player not found"})
      player.addBalance(-req.body.amount)
      .then((player)=> res.status(200).json({balance: player.balance, currency: player.currency}) )
      .error((err)=> res.status(409).json({error: err}))
    })
    .error((err)=> res.status(409).json({error: err}))
  })

  app.post("/rcg_api/rollback_transaction", function (req, res) {
    if (!isValidRequest(req, res)) return
    // Rollback transaction by req.body.reference
    res.status(200).json({})
  })
}