
module.exports = (sequelize, DataTypes) => {


  let Wallet = sequelize.define("Wallet", {
      currency: DataTypes.STRING,
      balance: DataTypes.INTEGER.UNSIGNED
    }, {
      tableName: "wallets",

      classMethods: {

        findOrCreateForPlayer: (playerId) => {
          let records = [
            {currency: "free", balance: 100000000000, player_id: playerId},
            {currency: "eur",  balance: 100000000000, player_id: playerId},
            {currency: "usd",  balance: 100000000000, player_id: playerId}
          ]
          return Wallet.bulkCreate(records)
        }


      }
    }
  )

  return Wallet
}