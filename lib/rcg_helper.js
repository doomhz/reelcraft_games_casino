import crypto from "crypto"
import request from "request"

class RcgHelper {
  constructor(options){
    this.config = options.config
  }

  signHMAC(data) {
    let message = ""
    Object.keys(data).sort().forEach((key)=>
      message += `${key}=${data[key]}`
    )
    return crypto.createHmac("sha256", this.config.rcg_api.secret).update(message).digest("hex")
  }

  verifyHMAC(signature, data) {
    let expectedSignature = this.signHMAC(data)
    console.log(data)
    if (signature !== expectedSignature) console.error(`expected signature: ${expectedSignature}, actual: ${signature}`)
    return expectedSignature === signature
  }

  request(command, data, callback){
    let uri = `${this.config.rcg_api.endpoint}/${command}`
    let signature = this.signHMAC(data)
    let options = {
      uri: uri,
      method: "post",
      json: data,
      headers: {
        'X-Signature': signature
      }
    }
    request(options, function (err, response, body){
      if (err) return callback(err)
      if (!response) return callback(`Empty response - ${command} - ${JSON.serialize(data)}`)
      if (response.statusCode !== 200) return callback(`Status code ${response.statusCode} != 200, message: ${response.statusMessage} - ${command} - ${JSON.serialize(data)}`)
      return callback(null, body)
    })
  }
}

export default RcgHelper