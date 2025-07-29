const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const generateToken = require('../utils/generateToken');

const prisma = new PrismaClient();

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = generateToken(newUser.id);

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token,
    });
  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
