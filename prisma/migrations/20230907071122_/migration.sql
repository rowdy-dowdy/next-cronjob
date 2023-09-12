-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionName" TEXT,
    "optionA" TEXT,
    "optionB" TEXT,
    "optionC" TEXT,
    "optionD" TEXT,
    "groupQuestionId" TEXT NOT NULL,
    CONSTRAINT "Question_groupQuestionId_fkey" FOREIGN KEY ("groupQuestionId") REFERENCES "GroupQuestion" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("groupQuestionId", "id", "optionA", "optionB", "optionC", "optionD", "questionName") SELECT "groupQuestionId", "id", "optionA", "optionB", "optionC", "optionD", "questionName" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
CREATE TABLE "new_GroupQuestion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "options" TEXT NOT NULL,
    "imageId" TEXT,
    "passageId" TEXT NOT NULL,
    CONSTRAINT "GroupQuestion_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "GroupQuestion_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "Passage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_GroupQuestion" ("id", "imageId", "options", "passageId", "title", "type") SELECT "id", "imageId", "options", "passageId", "title", "type" FROM "GroupQuestion";
DROP TABLE "GroupQuestion";
ALTER TABLE "new_GroupQuestion" RENAME TO "GroupQuestion";
CREATE TABLE "new_Passage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    CONSTRAINT "Passage_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Passage" ("content", "id", "quizId", "title") SELECT "content", "id", "quizId", "title" FROM "Passage";
DROP TABLE "Passage";
ALTER TABLE "new_Passage" RENAME TO "Passage";
CREATE TABLE "new_Answer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "answerName" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Answer" ("answerName", "id", "questionId") SELECT "answerName", "id", "questionId" FROM "Answer";
DROP TABLE "Answer";
ALTER TABLE "new_Answer" RENAME TO "Answer";
CREATE UNIQUE INDEX "Answer_questionId_key" ON "Answer"("questionId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
