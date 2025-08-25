/*
  Warnings:

  - A unique constraint covering the columns `[razorpayOrderId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Made the column `paymentStatus` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Order" ALTER COLUMN "paymentStatus" SET NOT NULL,
ALTER COLUMN "paymentStatus" SET DEFAULT 'pending';

-- CreateTable
CREATE TABLE "public"."CouponApplication" (
    "id" SERIAL NOT NULL,
    "studentName" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "discountRate" INTEGER NOT NULL DEFAULT 10,
    "applied" BOOLEAN NOT NULL DEFAULT false,
    "orderId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "CouponApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_razorpayOrderId_key" ON "public"."Order"("razorpayOrderId");
