module.exports = function(sequelize, DataTypes){
  var Question = sequelize.define('Question', {
  	subject: {
  		type: DataTypes.STRING,
  	},
  	content: {
  		type: DataTypes.STRING,
  	}
  })

  return Question
}