-- CreateTable
CREATE TABLE "public"."admin" (
    "id" SERIAL NOT NULL,
    "adminId" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_adminId_key" ON "public"."admin"("adminId");
