import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

//connect DB (Mongo)
connectDB();
// set app
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [`${process.env.FRONT_URL}`, 'http://localhost:3000'],
    credentials: true,
  })
);

// route middleware
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

//-------------------- NOT USED in this project because files are now stored in S3, keeping this section for future purposes only -----
// static folder serve
//__dirname does not work when using the ES modules. Only avail using commoin js.
// This can be mimicked by using path.resolve

// const __dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
//------------------------------------------------------------------------------------
// Error handeling
app.use(notFound);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
