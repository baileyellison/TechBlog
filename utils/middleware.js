const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('../config/connection');

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'my_default_secret',
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}));

// Authentication middleware
const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('./form');
  } else {
    console.log('User is logged in:', req.session.user_id); // Debugging line
    next();
  }
};

module.exports = withAuth;