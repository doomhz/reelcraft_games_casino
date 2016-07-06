import _ from "underscore"

let getUser = function (req, autoCreate = false) {
  let user = {}
  try {
    user = JSON.parse(req.cookies.user)
  } catch (e) {}
  if (!user.id && autoCreate) {
    let key = Date.now()
    user = {
      id: `abc-${key}-xyz`,
      username: `demo-${key}`,
      wallets: [
        {currency: "free", balance: 100000000000, selected: true},
        {currency: "eur", balance: 100000000000, selected: false},
        {currency: "usd", balance: 100000000000, selected: false}
      ]
    }
  }
  return user
}

let setUser = function (res, user = null) {
  if (!user) return res.cookie("user", "", {expires: new Date(), httpOnly: true})
  return res.cookie("user", JSON.stringify(user), {expires: new Date(Number(new Date()) + 24*60*60*1000), httpOnly: true})
}

export function routes(app) { 
  app.post("/user", function (req, res) {
    let user = getUser(req, true)
    setUser(res, user)
    res.json(user)
  })

  app.get("/user", function (req, res) {
    res.json(getUser(req))
  })

  app.put("/user", function (req, res) {
    let user = getUser(req)
    user.wallets.forEach((wallet)=>
      wallet.selected = wallet.currency === req.body.currency ? true : false
    )
    setUser(res, user)
    res.json(user)
  })

  app.delete("/user", function (req, res) {
    setUser(res, null)
    res.json({})
  })
}