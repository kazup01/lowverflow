module.exports = function(sequelize, DataTypes){
  var Question = sequelize.define('Question', {
  	subject: {
  		type: DataTypes.STRING,
  	},
  	content: {
  		type: DataTypes.STRING,
  	}
  },
  {
  	classMethods: {
  		associate: function(models){
  			Question.belongsToMany(models.Tag, {through: 'TagQuestion'})
  			Question.belongsTo(models.User)
  			Question.hasMany(models.Answer)
  			Question.belongsToMany(models.Category, {through: 'CategoryQuestion'})
  		}
  	}
  })

  return Question
}