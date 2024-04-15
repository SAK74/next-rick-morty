-- CreateEnum
CREATE TYPE "HeroStatus" AS ENUM ('Alive', 'Dead', 'unknown');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Female', 'Male', 'Genderless', 'unknown');

-- CreateTable
CREATE TABLE "favorites" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Custom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "HeroStatus" NOT NULL DEFAULT 'unknown',
    "gender" "Gender" NOT NULL DEFAULT 'unknown',
    "image" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "userEmail" TEXT NOT NULL,

    CONSTRAINT "Custom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "password" TEXT,
    "name" TEXT,
    "id" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FavoriteToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteToUser_AB_unique" ON "_FavoriteToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteToUser_B_index" ON "_FavoriteToUser"("B");

-- AddForeignKey
ALTER TABLE "Custom" ADD CONSTRAINT "Custom_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteToUser" ADD CONSTRAINT "_FavoriteToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteToUser" ADD CONSTRAINT "_FavoriteToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
