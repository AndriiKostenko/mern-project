import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import productRoutes from './routes/products.route.js';
import userRoutes from './routes/users.route.js';

const app = express();
dotenv.config();

app.use(express.json()); //allows us to accept JSON data in the body of the requests
app.use(express.urlencoded({ extended: true })); //allows us to accept URL encoded data in the body of the requests
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});