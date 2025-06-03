const Expense = require('../models/Expense')
const { Op, fn, col } = require('sequelize')

exports.add = async (req, res) => {
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
}

exports.expensesView = async (req, res) => {
    try {
        const userId = req.user.id;
        const expenses = await Expense.findAll({
            where: { userId },
            order: [['date', 'DESC']]
        });
        res.render('expenses', { expenses, title: 'history' })
    } catch (err) {
        console.error(err)
        res.status(500).redirect('/')
    }
}

exports.delete = async (req, res) => {
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
}

exports.changeView = async (req, res) => {
    const expense = await Expense.findByPk(req.params.id)
    if (!expense) return res.status(404).send('Expense not found')

    res.render('change', { expense })
}

exports.change = async (req, res) => {
    try {
        const { amount, category, date } = req.body
        await Expense.update(
            { amount, category, date },
            { where: { id: req.params.id } }
        )
    } catch (err) {
        res.status(500)
    }
    res.redirect('/')
}

exports.categoryView = async (req, res) => {
    try {
        const userId = req.user.id
        const category = req.params.category
        const expenses = await Expense.findAll({
            where: { userId, category },
            order: [['date', 'DESC']]
        });
        res.render('expenses', { expenses, title: category })
    } catch (err) {
        res.status(500).redirect('/')
    }
}

exports.monthView = async (req, res) => {
    try {
        const userId = req.user.id
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const expenses = await Expense.findAll({
            where: {
                userId,
                date: {
                    [Op.between]: [startOfMonth, endOfMonth]
                }
            },
            order: [['date', 'DESC']]
        })

        const total = await Expense.sum('amount', {
            where: {
                userId,
                date: {
                    [Op.between]: [startOfMonth, endOfMonth]
                }
            }
        })

        const top = await Expense.findOne({
            attributes: [
                'category',
                [fn('SUM', col('amount')), 'total']
            ],
            where: {
                userId,
                date: {
                    [Op.between]: [startOfMonth, endOfMonth]
                }
            },
            group: ['category'],
            order: [[fn('SUM', col('amount')), 'DESC']],
        })

        res.render('month', { expenses, total, top })
    } catch (err) {
        console.error(err)
        res.status(500).redirect('/')
    }
} 
