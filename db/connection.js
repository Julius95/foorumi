var Sequelize = require('sequelize');

/*var sequelize = new Sequelize('foorumi', '', '', {
  dialect: 'sqlite',
  storage: 'db/database.sqlite'
});*/

var sequelize = new
Sequelize('postgres://ixvftxutrlmela:2f7d0ce81ae01efc8367d6e226c5087e6a2acba83dec1df2945c648f8efcea28@ec2-107-20-214-99.compute-1.amazonaws.com:5432/d44bom30u85056', {
 dialect: 'postgres',
 protocol: 'postgres'
});

module.exports = {
  DataTypes: Sequelize,
  sequelize: sequelize
};
