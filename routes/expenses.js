const express = require('express')
const router = express.Router()
const expensesController = require('../controllers/expensesController')

router.post('/add', expensesController.add)
router.get('/', expensesController.expensesView)
router.post('/:id/delete', expensesController.delete)
router.get('/:id/change', expensesController.changeView)
router.post('/:id/change', expensesController.change)
router.get('/category/:category', expensesController.categoryView)
router.get('/month', expensesController.monthView)

module.exports = router;
