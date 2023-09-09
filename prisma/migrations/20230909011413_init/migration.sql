-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "username" TEXT
);

-- CreateTable
CREATE TABLE "Formulario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "age" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "chestPainType" TEXT NOT NULL,
    "restingBP" TEXT NOT NULL,
    "cholesterol" TEXT NOT NULL,
    "fastingBS" TEXT NOT NULL,
    "restingECG" TEXT NOT NULL,
    "maxHR" TEXT NOT NULL,
    "exerciseAngina" TEXT NOT NULL,
    "oldpeak" TEXT NOT NULL,
    "ST_Slope" TEXT NOT NULL,
    "predictionValue" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Formulario_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
