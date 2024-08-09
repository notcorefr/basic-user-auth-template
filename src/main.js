require('dotenv').config();
const path = require('node:path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
const mongoUrl = process.env.MONGO_URI;

var corsOptions = {
  origin: 'https://j6m04g6x-4000.inc1.devtunnels.ms/',
  optionsSuccessStatus: 200
};

// app.use(cors(corsOptions))
app.set("views", path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use('/public', express.static(path.join(__dirname, 'public')));



const indexRoutes = require('./routes/index');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const authRoutes = require('./routes/auth');

app.use('/', indexRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/auth', cors(corsOptions), authRoutes);



const port = process.env.TOEKN || 4000;

app.listen(port, () => {
  console.log(`Server Started on http://localhost:4000/`);
});


connectDb(mongoUrl);

async function connectDb(url) {
  let connection;
  try {
    connection = mongoose.connect(url);
  } catch (err) {
    console.log('Failed to connect The Database' + err);
    process.exit(1);
  }

  await connection;
  console.log("Connected to The Database");

  return connection;
}
