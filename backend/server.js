import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import productRoutes from './routes/products.route.js';

const app = express();
dotenv.config();

app.use(express.json()); //allows us to accept JSON data in the body of the requests
app.use('/api/products', productRoutes);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});