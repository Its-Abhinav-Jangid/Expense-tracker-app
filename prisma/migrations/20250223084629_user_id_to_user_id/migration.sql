/*
  Warnings:

  - You are about to drop the column `userId` on the `expenses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_userId_fkey";

-- DropIndex
DROP INDEX "expenses_id_userId_idx";

-- AlterTable
ALTER TABLE "expenses" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT;

-- CreateIndex
CREATE INDEX "expenses_id_user_id_idx" ON "expenses"("id", "user_id");

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
