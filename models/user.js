const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Hash password before saving to database
  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  // Define associations
  User.associate = (models) => {
    User.hasMany(models.Post, {
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Comment, {
      onDelete: 'CASCADE'
    });
  };

  return User;
};
