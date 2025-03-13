-- CreateEnum
CREATE TYPE "categories" AS ENUM ('Any', 'Food');

-- CreateTable
CREATE TABLE "expenses" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "category" "categories" NOT NULL DEFAULT 'Any',

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);
