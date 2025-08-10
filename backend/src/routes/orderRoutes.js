import express from "express";
import { createOrder, getOrdersByEmail, getAllOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/orders", createOrder);


router.get("/orders", getOrdersByEmail); //Add this line

// this route for admin
router.get("/admin/orders", getAllOrders);

export default router;
