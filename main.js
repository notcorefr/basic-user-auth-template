require('dotenv').config();
const express = require('express');
const app = express();
const indexRoutes = require('./routes/index');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');

app.set('view engine', 'ejs');


app.use('/public', express.static('public'))


app.use('/', indexRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);



const port = process.env.TOEKN || 4000;
app.listen(port, () => {
    console.log(`Server Started on http://localhost:4000/`);
});

