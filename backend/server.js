import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

const app = express();
dotenv.config();

app.use(express.json()); //allows us to accept JSON data in the body of the requests

app.post('/products', async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: 'Data is required' });
    }

    const newProduct = new Product({
        name: product.name,
        price: product.price,
        image: product.image,
    });

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.log('Saving product error', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});