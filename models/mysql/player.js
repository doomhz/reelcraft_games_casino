
module.exports = (sequelize, DataTypes) => {


  let Player = sequelize.define("Player", {
      uid: DataTypes.STRING,
      username: DataTypes.STRING,
      currency: DataTypes.STRING,
      balance: DataTypes.BIGINT.UNSIGNED
    }, {
      tableName: "players",

      classMethods: {

        createNew: (currency = "free") => {
          let key = Date.now()
          return Player.create({
            uid: `abc-${key}-xyz`,
            username: `demo-${key}`,
            currency: currency,
            balance: 100000000000
          })
        },

        loadFromString: (jsonStr) => {
          console.log("Player.loadFromString:", jsonStr)
          let attributes = JSON.parse(jsonStr)
          let player = Player.build(attributes)
          return Player.findOne({where: {id: player.id}})
        },

        findByUid: (uid) => {
          return Player.findOne({where: {uid: uid}})
        }

      },

      instanceMethods: {
        addBalance: function (amount) {
          return this.increment({balance: amount})
        }
      }
    }
  )

  return Player
}