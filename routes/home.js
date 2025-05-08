const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
    if (req.user) {
        res.render('home', { username: req.user.username })
    } else {
        res.redirect('/auth/login')
    }
});

module.exports = router;

