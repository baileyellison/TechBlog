const router = require('express').Router();
const homeRoutes = require('./home-routes'); // Assuming correct path to home-routes
const apiRoutes = require('./api'); // Assuming correct path to api routes

// Use the routes
router.use('/', homeRoutes); // Mount homeRoutes at the root endpoint
router.use('/api', apiRoutes); // Mount apiRoutes under the '/api' endpoint

module.exports = router;
