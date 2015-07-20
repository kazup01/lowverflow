module.exports = function(sequelize, DataTypes){
  var Tag = sequelize.define('Tag', {
  	tag: {
  		type: DataTypes.STRING,
  	}
  },
  {
  	classMethods: {
  		associate: function(models){
  			Tag.belongsToMany(models.Question, {through: 'TagQuestion'})
  		}
  	}
  })

  return Tag
}