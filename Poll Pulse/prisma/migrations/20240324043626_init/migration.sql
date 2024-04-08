-- CreateTable
CREATE TABLE "Option" (
    "id" SERIAL NOT NULL,
    "pollId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poll" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'anonymous',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "votes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
