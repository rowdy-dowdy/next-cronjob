-- AlterTable
ALTER TABLE "GroupSetting" ADD COLUMN "label" TEXT;
ALTER TABLE "GroupSetting" ADD COLUMN "sort" INTEGER;

-- AlterTable
ALTER TABLE "Setting" ADD COLUMN "label" TEXT;
ALTER TABLE "Setting" ADD COLUMN "sort" INTEGER;
