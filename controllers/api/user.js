const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

// Number of salt rounds for bcrypt hashing
const SALT_ROUNDS = 10;

// Signup route
router.post('/signup', async (req, res) => {
  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    // Check if username already exists
    const existingUser = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists. Please choose a different one.' });
    }

    // Create new user
    const newUser = await User.create({
      username: req.body.username,
      password: hashedPassword,
    });

    // Save session
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.loggedIn = true;
      res.status(200).json(newUser);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    // Find user by username
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    // If user doesn't exist
    if (!user) {
      return res.status(400).json({ message: 'No user found with that username!' });
    }

    // Compare passwords
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    // If password doesn't match
    if (!validPassword) {
      return res.status(400).json({ message: 'Incorrect password!' });
    }

    // Save session
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.loggedIn = true;
      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout route
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
