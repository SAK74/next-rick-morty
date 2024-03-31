-- CreateEnum
CREATE TYPE "HeroStatus" AS ENUM ('Alive', 'Dead', 'unknown');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Female', 'Male', 'Genderless', 'unknown');

-- CreateTable
CREATE TABLE "Custom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "HeroStatus" NOT NULL DEFAULT 'unknown',
    "gender" "Gender" NOT NULL DEFAULT 'unknown',
    "image" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Custom_pkey" PRIMARY KEY ("id")
);
