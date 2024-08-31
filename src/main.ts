import * as dotenv from 'dotenv';
dotenv.config();
import { join } from 'node:path';
import express from 'express';
import cors from 'cors';
import { connect, Connection, mongo } from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { checkAuth } from '@middleware/auth';

const app = express();
const mongoUrl = process.env.MONGO_URI;

var corsOptions = {
  origin: 'https://j6m04g6x-4000.inc1.devtunnels.ms/',
  optionsSuccessStatus: 200
};

// middlewares
app.set("views", join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/public', express.static(join(__dirname, 'public')));


// routes
import * as indexRoutes from './routes/index';
import * as loginRoutes from './routes/login';
import * as registerRoutes from './routes/register';
import * as authRoutes from './routes/auth';

app.use('/', checkAuth, indexRoutes.router);
app.use('/login',checkAuth, loginRoutes.router);
app.use('/register',checkAuth, registerRoutes.router);
app.use('/auth', cors(corsOptions), authRoutes.router);


// handle 404
app.get('*', function(req, res){
  res.status(404).render('404');
});




// database
const port = process.env.TOEKN || 4000;

app.listen(port, () => {
  console.log(`Server Started on http://localhost:4000/`);
});


if(!mongoUrl){
  console.log(`Please type MongoDb connection string in .env file`)
  process.exit(1);
}
connectDb(mongoUrl);

async function connectDb(url: string): Promise<void> {

  try {
    await connect(url);
  } catch (err) {
    console.log('Failed to connect The Database ');
    console.error(err);
    process.exit(1);
  }

  console.log("Connected to The Database");

}
