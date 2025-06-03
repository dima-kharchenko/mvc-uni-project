const Expense = require('../models/Expense');
const { Op } = require('sequelize');

exports.homeView = async (req, res) => {
    if (!req.user) { res.redirect('/auth/login') }
    const userId = req.user.id;
    const username = req.user.username;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    try {
        const lastExpenses = await Expense.findAll({
            where: { userId },
            order: [['date', 'DESC']],
            limit: 5,
        });        

        const totalMonth = await Expense.sum('amount', {
            where: {
                userId,
                date: { [Op.gte]: startOfMonth },
            },
        });

        const totalCount = await Expense.count({
            where: {
                userId,
                date: { [Op.gte]: startOfMonth },
            },
        });

        res.render('home', {
            username,
            lastExpenses,
            stats: {
                totalMonth: totalMonth || 0,
                totalCount,
            },
        });

    } catch (error) {
        console.error(error);
        res.render('home', {
            username,
            lastExpenses: [],
            stats: {
                totalMonth: 0,
                totalCount: 0,
            },
        });
    }
}
