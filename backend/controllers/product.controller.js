import Product from '../models/product.model.js'
import mongoose from 'mongoose';

//Get all products
export const getProducts = async (req, res) => {
        try {
            const products = await Product.find();
            res.status(200).json({ success: true, data: products });
        } catch (error) {
            console.log('Getting products error', error.message);
            res.status(500).json({ success: false, message: 'Products list is empty' });
        }
};

//Add new product
export const addNewProduct = async (req, res) => {
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
};

//Delete product
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Product id is invalid' });
    }

    try {
        const product = await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, data: product });
        console.log('Product deleted:', product);
    } catch (error) {
        console.log('Deleting product error', error.message);
        res.status(500).json({ success: false, message: 'Product not found' });
    }
};

//Update product
export const getProductById = async (req, res) => {
    const { id } = req.params;
    const { name, price, image } = req.body;
    console.log('Updating product:', req.body);

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Product id is invalid' });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, image }, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.log('Updating product error', error.message);
        res.status(500).json({ success: false, message: 'Product not found' }); 
    }
}