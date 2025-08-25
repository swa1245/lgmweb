import express from 'express';
import { createStudentDiscount, getAllStudentDiscounts } from '../controllers/studentDiscountController.js';

const router = express.Router();

// Route to create a new student discount application
router.post('/', createStudentDiscount);

// Route to get all student discount applications
router.get('/', getAllStudentDiscounts);

export default router;
