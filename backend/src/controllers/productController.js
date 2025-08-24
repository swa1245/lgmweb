
// import prisma from '../lib/prismaClient.js';

// // Get single product by ID
// export const getSingleProduct = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id); 
//     const product = await prisma.product.findUnique({
//       where: { id },
//     });

//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     res.json(product);
//   } catch (err) {
//     console.error('Error fetching product:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // Update stock after placing order
// export const updateProductStock = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     const { quantity } = req.body;

//     const updatedProduct = await prisma.product.update({
//       where: { id },
//       data: {
//         stockQuantity: {
//           decrement: quantity,
//         },
//       },
//     });

//     res.json(updatedProduct);
//   } catch (err) {
//     console.error('Error updating stock:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };.






// src/controllers/productController.js
import prisma from "../lib/prismaClient.js";

// ✅ Get all out-of-stock products
export const getOutOfStockProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { stockQuantity: 0 },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch out of stock products" });
  }
};

// ✅ Update stock quantity (admin only)
export const updateStock = async (req, res) => {
  const { id } = req.params;
  const { stockQuantity } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: { stockQuantity },
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update stock" });
  }
};

// ✅ Get all products with stock
export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

