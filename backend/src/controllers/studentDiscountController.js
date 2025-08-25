import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new student discount application
export const createStudentDiscount = async (req, res) => {
  try {
    const { studentName, academicYear, studentId } = req.body;

    // Validate required fields
    if (!studentName || !academicYear || !studentId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Create new student discount record
    const newDiscount = await prisma.studentDiscount.create({
      data: {
        studentName,
        academicYear,
        studentId
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Student discount application saved successfully',
      data: newDiscount
    });
  } catch (error) {
    console.error('Error creating student discount:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to save student discount application'
    });
  }
};

// Get all student discount applications
export const getAllStudentDiscounts = async (req, res) => {
  try {
    const discounts = await prisma.studentDiscount.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.status(200).json({
      success: true,
      data: discounts
    });
  } catch (error) {
    console.error('Error fetching student discounts:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch student discount applications'
    });
  }
};
