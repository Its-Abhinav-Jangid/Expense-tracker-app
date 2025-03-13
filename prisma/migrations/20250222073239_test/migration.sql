-- DropIndex
DROP INDEX "expenses_id_idx";

-- CreateIndex
CREATE INDEX "expenses_id_userId_idx" ON "expenses"("id", "userId");
