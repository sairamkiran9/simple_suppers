/*
  Warnings:

  - You are about to drop the column `personId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `personId` on the `Consumer` table. All the data in the column will be lost.
  - The primary key for the `Person` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `personId` on the `Producer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[personFirebaseUid]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[personFirebaseUid]` on the table `Consumer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[personFirebaseUid]` on the table `Producer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `personFirebaseUid` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personFirebaseUid` to the `Consumer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firebaseUid` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personFirebaseUid` to the `Producer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_personId_fkey";

-- DropForeignKey
ALTER TABLE "Consumer" DROP CONSTRAINT "Consumer_personId_fkey";

-- DropForeignKey
ALTER TABLE "Producer" DROP CONSTRAINT "Producer_personId_fkey";

-- DropIndex
DROP INDEX "Address_personId_key";

-- DropIndex
DROP INDEX "Consumer_personId_key";

-- DropIndex
DROP INDEX "Producer_personId_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "personId",
ADD COLUMN     "personFirebaseUid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Consumer" DROP COLUMN "personId",
ADD COLUMN     "personFirebaseUid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Person" DROP CONSTRAINT "Person_pkey",
DROP COLUMN "id",
ADD COLUMN     "displayName" TEXT,
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "firebaseUid" TEXT NOT NULL,
ADD COLUMN     "photoURL" TEXT,
ADD COLUMN     "profileCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "firstname" DROP NOT NULL,
ALTER COLUMN "lastname" DROP NOT NULL,
ADD CONSTRAINT "Person_pkey" PRIMARY KEY ("firebaseUid");

-- AlterTable
ALTER TABLE "Producer" DROP COLUMN "personId",
ADD COLUMN     "personFirebaseUid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Address_personFirebaseUid_key" ON "Address"("personFirebaseUid");

-- CreateIndex
CREATE UNIQUE INDEX "Consumer_personFirebaseUid_key" ON "Consumer"("personFirebaseUid");

-- CreateIndex
CREATE UNIQUE INDEX "Producer_personFirebaseUid_key" ON "Producer"("personFirebaseUid");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_personFirebaseUid_fkey" FOREIGN KEY ("personFirebaseUid") REFERENCES "Person"("firebaseUid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producer" ADD CONSTRAINT "Producer_personFirebaseUid_fkey" FOREIGN KEY ("personFirebaseUid") REFERENCES "Person"("firebaseUid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consumer" ADD CONSTRAINT "Consumer_personFirebaseUid_fkey" FOREIGN KEY ("personFirebaseUid") REFERENCES "Person"("firebaseUid") ON DELETE RESTRICT ON UPDATE CASCADE;
