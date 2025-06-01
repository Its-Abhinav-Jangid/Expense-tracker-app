-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "categories" ADD VALUE 'Debt';
ALTER TYPE "categories" ADD VALUE 'Health';
ALTER TYPE "categories" ADD VALUE 'Shopping';
ALTER TYPE "categories" ADD VALUE 'Education';
ALTER TYPE "categories" ADD VALUE 'Groceries';
ALTER TYPE "categories" ADD VALUE 'Rent';
ALTER TYPE "categories" ADD VALUE 'Insurance';
ALTER TYPE "categories" ADD VALUE 'PersonalCare';
ALTER TYPE "categories" ADD VALUE 'Subscriptions';
ALTER TYPE "categories" ADD VALUE 'Gifts';
ALTER TYPE "categories" ADD VALUE 'Taxes';
ALTER TYPE "categories" ADD VALUE 'Miscellaneous';
