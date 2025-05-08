const express = require('express');
const crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');

const router = express.Router();

passport.use(new LocalStrategy(async function verify(username, password, done) {
    try {
        const user = await User.findOne({ where: { username: username } })
        if (!user) {
            return done(null, false, { message: 'Incorrect username or password' })
        }

        crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', async (err, hashedPassword) => {
            if (err) { return done(err) }

            if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
                return done(null, false, { message: 'Incorrect username or password' })
            }
            return done(null, user)
        })
    } catch (e) {
        return done(e)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findByPk(id).then((user) => { done(null, user) })
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: 'auth/login?failed=1'
}))

router.get('/login', (_, res) => {
    res.render('login')
})

router.post('/signup', (req, res) => {
    let salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async (err, hashedPassword) => {
        if (err) { res.redirect('/auth/signup?failed=1') }

        try {
            const user = await User.create({ username: req.body.username, password: hashedPassword, salt: salt })
            req.login(user, (err) => {
                if (err) { res.redirect('/auth/signup?failed=3') }
                res.redirect('/')
            })
        } catch (e) {
            res.redirect('/auth/signup?failed=2')
        }
    })
})

router.get('/signup', (_, res) => {
    res.render('signup')
})

router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return res.status(500).send(err)}
        res.redirect('/')
    })
})

module.exports = router;
