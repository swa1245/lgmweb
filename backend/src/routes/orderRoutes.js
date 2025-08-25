import express from "express";
import { createOrder, getOrdersByEmail, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";

const router = express.Router();

router.post("/orders", createOrder);


router.get("/orders", getOrdersByEmail); //Add this line

// these routes for admin
router.get("/admin/orders", getAllOrders);
router.put("/admin/orders/status", updateOrderStatus);

export default router;
