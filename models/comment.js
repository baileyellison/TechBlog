const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  ... // configuration object from config/config.json
});

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// Define associations
Comment.belongsTo(User);  // A Comment belongs to a User
Comment.belongsTo(Post);  // A Comment belongs to a Post

module.exports = Comment;
