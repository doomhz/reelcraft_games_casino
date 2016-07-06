export function routes(app) {
  app.use(function (req, res) {
    res.render("site/index")
  })
}