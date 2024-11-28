import express from "express";
import { getProducts, addNewProduct, deleteProduct, getProductById } from "../controllers/product.controller.js";

const router = express.Router();

router.get('/', getProducts); 
router.post('/', addNewProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', getProductById);

export default router;