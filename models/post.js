const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Adjust path as necessary

const User = require('./user'); // Adjust path as per your directory structure
const Comment = require('./comment'); // Adjust path as per your directory structure

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Define associations
Post.belongsTo(User);   // A Post belongs to a User
Post.hasMany(Comment);  // A Post can have many Comments

module.exports = Post;
