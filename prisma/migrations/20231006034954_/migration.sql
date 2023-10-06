-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Setting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "label" TEXT,
    "type" TEXT NOT NULL,
    "details" TEXT,
    "value" TEXT,
    "col" INTEGER,
    "sort" INTEGER,
    "show" BOOLEAN NOT NULL DEFAULT true,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "groupId" TEXT NOT NULL,
    CONSTRAINT "Setting_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "GroupSetting" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Setting" ("col", "createdAt", "details", "groupId", "id", "label", "name", "sort", "type", "updatedAt", "value") SELECT "col", "createdAt", "details", "groupId", "id", "label", "name", "sort", "type", "updatedAt", "value" FROM "Setting";
DROP TABLE "Setting";
ALTER TABLE "new_Setting" RENAME TO "Setting";
CREATE UNIQUE INDEX "Setting_name_key" ON "Setting"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
