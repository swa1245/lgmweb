-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "paymentStatus" TEXT,
ADD COLUMN     "razorpayOrderId" TEXT,
ADD COLUMN     "razorpayPaymentId" TEXT,
ADD COLUMN     "razorpaySignature" TEXT;
