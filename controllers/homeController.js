const Expense = require('../models/Expense');

exports.homeView = async (req, res) => {
    if (!req.user) { res.redirect('/auth/login') }
    const userId = req.user.id;
    const username = req.user.username;

    try {
        const lastExpenses = await Expense.findAll({
            where: { userId },
            order: [['date', 'DESC']],
            limit: 5,
        });        

        res.render('home', {
            username,
            lastExpenses,
        });

    } catch (error) {
        console.error(error);
        res.render('home', {
            username,
            lastExpenses: [],
        });
    }
}
