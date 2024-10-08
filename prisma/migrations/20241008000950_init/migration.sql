-- CreateTable
CREATE TABLE "BudgetList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "spending" INTEGER NOT NULL,

    CONSTRAINT "BudgetList_pkey" PRIMARY KEY ("id")
);
