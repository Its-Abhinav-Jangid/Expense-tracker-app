-- DropIndex
DROP INDEX "expenses_id_user_id_idx";

-- AlterTable
ALTER TABLE "expenses" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "notes" TEXT;

-- CreateIndex
CREATE INDEX "expenses_id_user_id_date_idx" ON "expenses"("id", "user_id", "date");
