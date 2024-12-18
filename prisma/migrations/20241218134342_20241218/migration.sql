-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "password" VARCHAR(255) NOT NULL,
    "theme" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diaries" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "summary" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Diaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chats" (
    "id" TEXT NOT NULL,
    "diaryId" TEXT NOT NULL,
    "mode" INTEGER NOT NULL,
    "message" VARCHAR(255) NOT NULL,
    "response" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonthlySummaries" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MonthlySummaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Analyses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Analyses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Continuation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "done" BOOLEAN NOT NULL,

    CONSTRAINT "Continuation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiaryTags" (
    "id" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "diaryId" TEXT NOT NULL,

    CONSTRAINT "DiaryTags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Diaries_userId_idx" ON "Diaries"("userId");

-- CreateIndex
CREATE INDEX "Chats_diaryId_idx" ON "Chats"("diaryId");

-- CreateIndex
CREATE INDEX "MonthlySummaries_userId_idx" ON "MonthlySummaries"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Analyses_userId_key" ON "Analyses"("userId");

-- CreateIndex
CREATE INDEX "Analyses_userId_idx" ON "Analyses"("userId");

-- AddForeignKey
ALTER TABLE "Diaries" ADD CONSTRAINT "Diaries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chats" ADD CONSTRAINT "Chats_diaryId_fkey" FOREIGN KEY ("diaryId") REFERENCES "Diaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlySummaries" ADD CONSTRAINT "MonthlySummaries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analyses" ADD CONSTRAINT "Analyses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Continuation" ADD CONSTRAINT "Continuation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiaryTags" ADD CONSTRAINT "DiaryTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiaryTags" ADD CONSTRAINT "DiaryTags_diaryId_fkey" FOREIGN KEY ("diaryId") REFERENCES "Diaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
