const express = require('express');
const authController = require('../controllers/authController')
const router = express.Router();

router.post('/login', authController.login)
router.get('/login', authController.loginView)

router.post('/signup', authController.signup)
router.get('/signup', authController.signupView)

router.post('/logout', authController.logout)

module.exports = router;
