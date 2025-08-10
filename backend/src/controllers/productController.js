
import prisma from '../lib/prismaClient.js';

// Get single product by ID
export const getSingleProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id); 
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update stock after placing order
export const updateProductStock = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { quantity } = req.body;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        stockQuantity: {
          decrement: quantity,
        },
      },
    });

    res.json(updatedProduct);
  } catch (err) {
    console.error('Error updating stock:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
