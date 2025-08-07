// // const bcrypt = require('bcryptjs');
// // const { PrismaClient } = require('@prisma/client');
// // const generateToken = require('../utils/generateToken');

// // const prisma = new PrismaClient();

// // exports.registerUser = async (req, res) => {
// //   const { name, email, password } = req.body;

// //   try {
// //     const existingUser = await prisma.user.findUnique({ where: { email } });

// //     if (existingUser) {
// //       return res.status(400).json({ message: 'User already exists' });
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const newUser = await prisma.user.create({
// //       data: {
// //         name,
// //         email,
// //         password: hashedPassword,
// //       },
// //     });

// //     const token = generateToken(newUser.id);

// //     res.status(201).json({
// //       id: newUser.id,
// //       name: newUser.name,
// //       email: newUser.email,
// //       token,
// //     });
// //   } catch (error) {
// //     console.error('Error in registerUser:', error);
// //     res.status(500).json({ message: 'Something went wrong' });
// //   }
// // };


// // backend/src/controllers/authController.js

// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import prisma from '../lib/prismaClient.js';

// export const signup = async (req, res) => {
//   try {
//     const { name, email, password, phone } = req.body;

//     // Check if user already exists
//     const existingUser = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//         phone,
//       },
//     });

//     // Generate JWT token
//     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
//       expiresIn: '1d',
//     });

//     res.status(201).json({ token, user });
//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };





// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import prisma from '../lib/prismaClient.js';

// // Signup Function
// export const signup = async (req, res) => {
//   try {
//     const { name, email, password, phone } = req.body;

//     // Check if user already exists
//     const existingUser = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//         phone,
//       },
//     });

//     // Generate JWT token
//     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
//       expiresIn: '1d',
//     });

//     res.status(201).json({ token, user });
//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
// // Login Function
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // ✅ INSERT this line right here:
//     console.log("Phone returned at login:", user.phone);

//     // Generate JWT token
//     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
//       expiresIn: '1d',
//     });

//     res.status(200).json({
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone, // this must have a value!
//       },
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };




import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prismaClient.js';

// =======================
// USER SIGNUP FUNCTION
// =======================
const signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, phone },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(201).json({ token, user });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// =======================
// USER LOGIN FUNCTION
// =======================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// =======================
// ADMIN LOGIN FUNCTION
// =======================
const adminLogin = async (req, res) => {
  try {
    const { adminId, password } = req.body;

    const admin = await prisma.admin.findUnique({ where: { adminId } });

    if (!admin) {
      return res.status(400).json({ message: 'Invalid admin ID or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid admin ID or password' });
    }

    const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({ message: 'Admin login successful', admin, token });
  } catch (error) {
    console.error('Admin Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Export all three functions
export { signup, login,  adminLogin };




