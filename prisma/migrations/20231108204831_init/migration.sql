-- CreateTable
CREATE TABLE "Engaged" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "groom_name" TEXT NOT NULL,
    "bride_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "role" TEXT NOT NULL DEFAULT 'client',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "first_access" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Engaged_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guests" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "attendance_status" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT NOT NULL DEFAULT '',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "engaged_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Engaged_email_key" ON "Engaged"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Guests_code_key" ON "Guests"("code");

-- AddForeignKey
ALTER TABLE "Guests" ADD CONSTRAINT "Guests_engaged_id_fkey" FOREIGN KEY ("engaged_id") REFERENCES "Engaged"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
