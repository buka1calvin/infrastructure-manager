import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import passport from 'passport';
import session from 'express-session';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import allRoutes from './routes/index';
import adminSeeder from './seeders/adminSeeder';
import { swaggerDocument } from './swagger';
import { stripeHook } from './controllers/payment.controller';

const app=express();

app.use(cors());

mongoose
  .connect(process.env.DEV_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    adminSeeder();
    app.use(express.json());
  });	
  app.post('/api/v1/users/payment/webhook',bodyParser.raw({ type: 'application/json' }), stripeHook)
  
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(bodyParser.json());


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize())
  app.use(passport.session())
  try {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use('/api/v1', allRoutes);
  } catch (error) {
    console.log(error);
  }



export default app;
