import RcgHelper from "../../lib/rcg_helper"

let rcgHelper = new RcgHelper({config: GLOBAL.config})

export function routes(app) {
  app.post("/rcg_api/create_session", function (req, res) {
    let data = {
      partner_uid: GLOBAL.config.rcg_api.partner_uid,
      player_uid: "123",
      currency: "free"
    }
    rcgHelper.request("create_session", data, function(err, response) {
      if (err) {
        console.error(err)
        return res.status(409).json({error: "Could not open session."})
      }
      res.json({token: response.data.token})
    })
  })

  app.post("/rcg_api/close_session", function (req, res) {
    let data = {
      partner_uid: config.rcg_api.partner_uid,
      token: req.body.token
    }
    rcgHelper.request("close_session", data, function(err, response) {
      if (err) {
        console.error(err)
        return res.status(409).json({error: "Could not close session."})
      }
      res.json({})
    })
  })
}