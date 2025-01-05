/*
  Warnings:

  - A unique constraint covering the columns `[ideaId,userId]` on the table `IdeaLike` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "IdeaLike_ideaId_userId_key" ON "IdeaLike"("ideaId", "userId");
