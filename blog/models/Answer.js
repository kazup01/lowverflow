module.exports = function (sequelize, DataTypes) {
  var Answer = sequelize.define('Answer', {
    answer: {
      type: DataTypes.STRING,
    }
  },
  {
  	classMethods: {
  		associate: function(models){
  			Answer.belongsTo(models.Question)
  			Answer.belongsTo(models.User)
  		}
  	}
  })
  
  return Answer
}