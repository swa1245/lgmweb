import express from 'express';
import {
  getAllProducts,
  createProduct,
  updateProductStockByAdmin,
  deleteProduct,
  getProductById,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id/admin-stock', updateProductStockByAdmin); 
router.delete('/:id', deleteProduct);

export default router;
