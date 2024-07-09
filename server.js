// Require necessary modules
require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

// Require Sequelize and its session store
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Configure Handlebars engine
const hbs = exphbs.create({
  helpers,
  partialsDir: path.join(__dirname, 'views/partials')
});

// Configure session middleware
const sess = {
  secret: process.env.SESSION_SECRET || 'my_default_secret',
  cookie: { maxAge: 24 * 60 * 60 * 1000 }, // Session expires after 24 hours (optional)
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    expiration: 24 * 60 * 60 * 1000 // Session expires after 24 hours (optional)
  })
};

// Use session middleware
app.use(session(sess));

// Set up Handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(routes);

// Sync Sequelize models and start server
sequelize.sync({ force: false }) // Set `force` to true to drop and re-create tables on every app start (useful during development)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });
