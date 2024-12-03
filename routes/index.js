// routes/index.js
const express = require('express');
const router = express.Router();
const passport = require('passport');  // Ensure passport is imported

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Welcome']
    res.send('Welcome to Point of Sale'); // Updated welcome message
});

router.use('/products', require('./products'));
router.use('/transactions', require('./transactions'));

// Route for logging in via GitHub
router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

// Callback route after GitHub authentication
router.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        // On successful authentication, redirect to the dashboard or another protected page
        res.redirect('/dashboard');  // Change this as needed
    }
);

// Logout route
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) return next(err);
        res.redirect('/');  // Redirect to the homepage after logout
    });
});

module.exports = router;
