const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Adjust path as necessary

const User = require('./user'); // Adjust path as per your directory structure
const Post = require('./post'); // Adjust path as per your directory structure

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Define associations
Comment.belongsTo(User);  // A Comment belongs to a User
Comment.belongsTo(Post);  // A Comment belongs to a Post

module.exports = Comment;
