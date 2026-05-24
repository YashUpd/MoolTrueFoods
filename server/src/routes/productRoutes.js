import express from 'express'
import {
  getProducts, getProduct,
  createProduct, updateProduct, deleteProduct
} from '../controllers/productController.js'
import { protect } from '../middleware/authMiddleware.js'
import { upload } from '../middleware/uploadMiddleware.js'

const router = express.Router()

// Public routes
router.get('/', getProducts)
router.get('/:id', getProduct)

// Admin protected routes (JWT required)
router.post('/', protect, upload.single('image'), createProduct)
router.put('/:id', protect, upload.single('image'), updateProduct)
router.delete('/:id', protect, deleteProduct)

export default router
