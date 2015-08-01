var bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      set: function (name) {
        this.setDataValue('name', name.toLowerCase())
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      set:  function(v) {
          var salt = bcrypt.genSaltSync(10);
          var hash = bcrypt.hashSync(v, salt);
          this.setDataValue('password', hash);
      }
    }
  },
  { 
    instanceMethods: {
      comparePassword: function (password) {
        if (password == null) return false
        return bcrypt.compareSync(password, this.password)
      }
    },
    classMethods: function(models){
      User.hasMany(models.Question)
      User.hasMany(models.Answer)
    }
  })

  return User
}
