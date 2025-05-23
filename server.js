const express = require('express');
const PORT = 8080;
const homeRouter = require("./routes/home");
const authRouter = require("./routes/auth")
const expensesRouter = require("./routes/expenses")
const sequelize = require("./database");
const passport = require('passport');
const session = require('express-session');
const User = require('./models/User');
const Expense = require('./models/Expense');

User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

sequelize.sync().then(() => console.log("db is ready"))

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(session({ secret: 'SECRETKEY', resave: true, saveUninitialized: true }));
app.use(passport.initialize())
app.use(passport.session());

app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/expenses', expensesRouter);

app.listen(PORT, console.log('Server is running at http://localhost:' + PORT));

