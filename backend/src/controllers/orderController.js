
import prisma from "../lib/prismaClient.js";


export const createOrder = async (req, res) => {
  try {
    const { formData, cart, totalAmount, totalAmountPaise } = req.body;

    const finalAmount = typeof totalAmountPaise === "number" 
      ? totalAmountPaise 
      : totalAmount * 100;

    if (!formData || !cart || !finalAmount) {
      return res.status(400).json({ success: false, message: "Missing order data" });
    }

    // ✅ Start transaction: create order + update stock
    const order = await prisma.$transaction(async (tx) => {
      // 1. Create order
      const newOrder = await tx.order.create({
        data: {
          ...formData,
          totalAmount: finalAmount,
          paymentStatus: "pending",
          items: {
            create: cart.map((item) => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price * 100,
            })),
          },
        },
      });

      // 2. Update stock for each product
      for (const item of cart) {
        // Find product by name instead of ID since frontend is using string IDs
        // but database expects integer IDs
        const product = await tx.product.findFirst({
          where: { name: item.name }
        });
        
        if (product) {
          await tx.product.update({
            where: { id: product.id }, // Use the actual numeric ID from database
            data: {
              stockQuantity: {
                decrement: item.quantity, // ✅ Reduce stock
              },
            },
          });
        } else {
          console.warn(`Product not found: ${item.name}`);
        }
      }

      return newOrder;
    });

    res.status(201).json({ success: true, order });

  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const getOrdersByEmail = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    const orders = await prisma.order.findMany({
      where: { email },
      include: {
        items: true, // include ordered products
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};


export const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("Error fetching all orders:", err);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    
    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: "Order ID and status are required" });
    }
    
    // Validate status
    const validStatuses = ['processing', 'shipped', 'delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }
    
    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(orderId) },
      data: { status },
    });
    
    res.status(200).json({ success: true, order: updatedOrder });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ success: false, message: "Error updating order status" });
  }
};
