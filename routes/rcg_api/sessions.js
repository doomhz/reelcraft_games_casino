import crypto from "crypto"
import request from "request"

const signHMAC = function (data) {
  let message = ""
  Object.keys(data).sort().forEach((key)=>
    message += `${key}=${data[key]}`
  )
  return crypto.createHmac("sha256", config.rcg_api.secret).update(message).digest("hex")
}

const verifyHMAC = function (signature, data) {
  let expectedSignature = signHMAC(data)
  console.log(data)
  if (signature !== expectedSignature) console.error(`expected signature: ${expectedSignature}, actual: ${signature}`)
  return expectedSignature === signature
}

export function routes(app) {
  app.post("/rcg_api/create_session", function (req, res) {
    let data = {
      partner_uid: config.rcg_api.partner_uid,
      player_uid: "123",
      currency: "free"
    }
    let uri = `${config.rcg_api.endpoint}/create_session`
    let signature = signHMAC(data)
    let options = {
      uri: uri,
      method: "post",
      json: data,
      headers: {
        'X-Signature': signature
      }
    }
    console.log(options)
    request(options, function (err, response, body){
      if (err) return res.status(409).json({error: err})
      if (!response) return res.status(409).json({error: "Empty response"})
      if (response.statusCode !== 200) return res.status(409).json({error: `Status code ${response.statusCode} != 200, message: ${response.statusMessage}`})
      res.json(body)
    })
  })

  app.post("/rcg_api/close_session", function (req, res) {
    // TBD
    res.json({})
  })
}