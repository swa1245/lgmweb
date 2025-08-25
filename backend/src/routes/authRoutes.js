import express from 'express';
import { signup, login, adminLogin, adminSignup } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/admin/login', adminLogin);
router.post('/admin/signup', adminSignup);

export default router;
