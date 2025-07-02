/*
  Warnings:

  - You are about to drop the column `personFirebaseUid` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `personFirebaseUid` on the `Consumer` table. All the data in the column will be lost.
  - The primary key for the `Person` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `personFirebaseUid` on the `Producer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[personEmail]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[personEmail]` on the table `Consumer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[firebaseUid]` on the table `Person` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[personEmail]` on the table `Producer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `personEmail` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personEmail` to the `Consumer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personEmail` to the `Producer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_personFirebaseUid_fkey";

-- DropForeignKey
ALTER TABLE "Consumer" DROP CONSTRAINT "Consumer_personFirebaseUid_fkey";

-- DropForeignKey
ALTER TABLE "Producer" DROP CONSTRAINT "Producer_personFirebaseUid_fkey";

-- DropIndex
DROP INDEX "Address_personFirebaseUid_key";

-- DropIndex
DROP INDEX "Consumer_personFirebaseUid_key";

-- DropIndex
DROP INDEX "Producer_personFirebaseUid_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "personFirebaseUid",
ADD COLUMN     "personEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Consumer" DROP COLUMN "personFirebaseUid",
ADD COLUMN     "personEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Person" DROP CONSTRAINT "Person_pkey",
ADD CONSTRAINT "Person_pkey" PRIMARY KEY ("email");

-- AlterTable
ALTER TABLE "Producer" DROP COLUMN "personFirebaseUid",
ADD COLUMN     "personEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Address_personEmail_key" ON "Address"("personEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Consumer_personEmail_key" ON "Consumer"("personEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Person_firebaseUid_key" ON "Person"("firebaseUid");

-- CreateIndex
CREATE UNIQUE INDEX "Producer_personEmail_key" ON "Producer"("personEmail");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_personEmail_fkey" FOREIGN KEY ("personEmail") REFERENCES "Person"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producer" ADD CONSTRAINT "Producer_personEmail_fkey" FOREIGN KEY ("personEmail") REFERENCES "Person"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consumer" ADD CONSTRAINT "Consumer_personEmail_fkey" FOREIGN KEY ("personEmail") REFERENCES "Person"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
