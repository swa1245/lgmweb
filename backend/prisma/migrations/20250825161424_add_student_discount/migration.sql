/*
  Warnings:

  - You are about to drop the `CouponApplication` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `description` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageUrl` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Product" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "imageUrl" SET NOT NULL;

-- DropTable
DROP TABLE "public"."CouponApplication";

-- CreateTable
CREATE TABLE "public"."StudentDiscount" (
    "id" SERIAL NOT NULL,
    "studentName" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentDiscount_pkey" PRIMARY KEY ("id")
);
