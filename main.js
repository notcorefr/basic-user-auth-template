require('dotenv').config();
const path = require('node:path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const indexRoutes = require('./routes/index');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const authRoutes = require('./routes/auth');

var corsOptions = {
  origin: 'http://localhost:4000',
  optionsSuccessStatus: 200
}



// app.use(cors(corsOptions))
app.set("views", path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use('/public', express.static('public'))


app.use('/', indexRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/auth', cors(corsOptions), authRoutes);



const port = process.env.TOEKN || 4000;
app.listen(port, () => {
  console.log(`Server Started on http://localhost:4000/`);
});

