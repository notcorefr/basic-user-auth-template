import * as dotenv from 'dotenv';
dotenv.config();
import { join } from 'node:path';
import express from 'express';
import cors from 'cors';
import { connect, Connection, mongo } from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();
const mongoUrl = process.env.MONGO_URI;

var corsOptions = {
  origin: 'https://j6m04g6x-4000.inc1.devtunnels.ms/',
  optionsSuccessStatus: 200
};

// app.use(cors(corsOptions))
app.set("views", join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use('/public', express.static(join(__dirname, 'public')));



import * as indexRoutes from './routes/index';
import * as loginRoutes from './routes/login';
import * as registerRoutes from './routes/register';
import * as authRoutes from './routes/auth';

app.use('/', indexRoutes.router);
app.use('/login', loginRoutes.router);
app.use('/register', registerRoutes.router);
app.use('/auth', cors(corsOptions), authRoutes.router);





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
