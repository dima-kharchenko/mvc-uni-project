const express = require('express');
const Expense = require('../models/Expense');

const router = express.Router();

router.post('/add', async (req, res) => {
    const { amount, category, date } = req.body;
    const userId = req.user.id;

    try {
        await Expense.create({ amount, category, date, userId });
        console.log("Added succesfully")
        res.redirect("/")
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
});

router.get('/', async (req, res) => {
    const userId = req.user.id;
    try {
        const expenses = await Expense.findAll({
            where: { userId },
            order: [['date', 'DESC']]
        });
        res.render('expenses', { expenses });
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
});

module.exports = router;
