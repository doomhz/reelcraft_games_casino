require(`${process.cwd()}/tests/helpers/spec_helper`)
import should from "should"

let Player = GLOBAL.db.Player

describe("Wallet", ()=> {

  beforeEach((done)=> Player.destroy({truncate: true}).then(()=> done()))

  describe("get_balance", ()=> {
    it("returns", ()=> {
      GLOBAL.db.Player.create().then(()=> {
        let a = 1
        a.should.eql(1)
      })
    })
  })

})