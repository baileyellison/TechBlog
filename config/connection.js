const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.tech_blog) {
  sequelize = new Sequelize(process.env.tech_blog);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: process.env.DB_PORT,
    }
  );
}

module.exports = sequelize;
