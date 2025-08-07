// const app = require('./app');
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });





import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api", orderRoutes);

const PORT = process.env.PORT || 5000;

prisma.$connect()
  .then(() => {
    console.log(" Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to the database:", err);
  });
