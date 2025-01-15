const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, signOut} = require('../controllers/userController');

// Route to register a new user
router.post('/register', registerUser);     //frontend connected

// Route to log in a user
router.post('/login', loginUser);            //frontend connected

// Route to get user profile (protected)
router.get('/profile', getUserProfile);

//signout
router.post('/signout', signOut);

module.exports = router;
