-- CreateTable
CREATE TABLE "task_completion" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "task_completion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "task_completion_taskId_date_key" ON "task_completion"("taskId", "date");

-- AddForeignKey
ALTER TABLE "task_completion" ADD CONSTRAINT "task_completion_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
