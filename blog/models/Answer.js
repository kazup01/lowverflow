module.exports = function (sequelize, DataTypes) {
  var Answer = sequelize.define('Answer', {
    answer: {
      type: DataTypes.STRING,
    }
  })
  
  return Answer
}