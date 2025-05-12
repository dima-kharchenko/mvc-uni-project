const express = require('express')
const Expense = require('../models/Expense')

const router = express.Router()

router.post('/add', async (req, res) => {
    const { amount, category, date } = req.body;
    const userId = req.user.id;

    try {
        await Expense.create({ amount, category, date, userId })
        console.log("Added succesfully")
        res.redirect("/")
    } catch (err) {
        console.error(err)
        res.status(500).send('Something went wrong')
    }
})

router.get('/', async (req, res) => {
    try {
        const userId = req.user.id;
        const expenses = await Expense.findAll({
            where: { userId },
            order: [['date', 'DESC']]
        });
        res.render('expenses', { expenses })
    } catch (err) {
        console.error(err)
        res.status(500).redirect("/")
    }
})

router.post('/:id/delete', async (req, res) => {
    const userId = req.user.id
    try {
        const expense = await Expense.findOne({ where: { id: req.params.id, userId } })
        if (!expense) return res.status(403).send("Forbidden")
        await expense.destroy()
        res.redirect(req.headers.referer || '/')
    } catch (err) {
        console.error(err)
        res.status(500).send('Something went wrong')
    }
})

router.get('/:id/change', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id)
    if (!expense) return res.status(404).send('Expense not found')

    res.render('change', { expense })
})

router.post('/:id/change', async (req, res) => {
    const { amount, category, date } = req.body
    await Expense.update(
        { amount, category, date },
        { where: { id: req.params.id } }
    )
    res.redirect('/')
})

module.exports = router;
