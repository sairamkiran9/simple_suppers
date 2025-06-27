-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_personFirebaseUid_fkey";

-- DropForeignKey
ALTER TABLE "Producer" DROP CONSTRAINT "Producer_personFirebaseUid_fkey";

-- DropForeignKey
ALTER TABLE "Consumer" DROP CONSTRAINT "Consumer_personFirebaseUid_fkey";

-- DropForeignKey
ALTER TABLE "MenuItem" DROP CONSTRAINT "MenuItem_producerId_fkey";

-- DropForeignKey
ALTER TABLE "FoodOrder" DROP CONSTRAINT "FoodOrder_consumerId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_itemId_fkey";

-- DropTable
DROP TABLE "Person";

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "Producer";

-- DropTable
DROP TABLE "Consumer";

-- DropTable
DROP TABLE "MenuItem";

-- DropTable
DROP TABLE "FoodOrder";

-- DropTable
DROP TABLE "OrderItem";

-- DropEnum
DROP TYPE "OrderStatus";

