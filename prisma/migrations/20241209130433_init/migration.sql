/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Analyses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Analyses_userId_key" ON "Analyses"("userId");
