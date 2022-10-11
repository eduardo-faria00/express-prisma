import { Router } from "express";

import ProductController from "./controllers/ProductController";
import CategoryController from "./controllers/CategoryController";

const router = Router()

router.post('/category', CategoryController.createCategory)
router.get('/category/:id', CategoryController.findCategory)
router.get('/categories', CategoryController.findAllCategories)
router.delete('/category', CategoryController.deleteCategory)

router.post('/product', ProductController.createProduct)
router.get('/products', ProductController.findAllProducts)
router.get('/product/:id', ProductController.findProduct)
router.put('/product/:id', ProductController.updateProduct)
router.delete('/product/:id', ProductController.deleteProduct)


export {router}