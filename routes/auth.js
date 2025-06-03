const express = require('express');
const authController = require('../controllers/authController')
const router = express.Router();

router.post('/login', authController.login)
router.get('/login', (req, res) => {
    const failed = req.query.failed
    res.render('login', { failed: failed })
})

router.post('/signup', authController.signup)
router.get('/signup', (req, res) => {
    const failed = req.query.failed
    res.render('signup', { failed: failed })
})

router.post('/logout', authController.logout)

module.exports = router;
