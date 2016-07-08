
module.exports = (sequelize, DataTypes) => {


  let Player = sequelize.define("Player", {
      uid: DataTypes.STRING,
      username: DataTypes.STRING,
      active_currency: DataTypes.STRING
    }, {
      tableName: "players",

      classMethods: {

        createPlayer: () => {
          let key = Date.now()
          let player = Player.build({
            uid: `abc-${key}-xyz`,
            username: `demo-${key}`,
            active_currency: "free"
          })
          return player.save()
          .then((player) => {
            return GLOBAL.db.Wallet.findOrCreateForPlayer(player.id)
            .then(() => {
              return Player.findAll({
                where: {id: player.id},
                include: [GLOBAL.db.Wallet]
              })
            })
          })
        }

      }
    }
  )

  return Player
}