const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  ... // configuration object from config/config.json
});

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// Define associations
Post.belongsTo(User);   // A Post belongs to a User
Post.hasMany(Comment);  // A Post can have many Comments

module.exports = Post;
