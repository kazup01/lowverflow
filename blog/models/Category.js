module.exports = function(sequelize, DataTypes){
  var Category = sequelize.define('Category', {
  	category: {
  		type: DataTypes.STRING,
  	}
  },
  {
  	classMethods: {
  		associate: function(models){
  			Category.belongsToMany(models.Question, {through: 'CategoryQuestion'})
  		}
  	}
  })

  return Category
}