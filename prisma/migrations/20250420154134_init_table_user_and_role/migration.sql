-- CreateTable
CREATE TABLE "dt_role" (
    "id" BIGSERIAL NOT NULL,
    "role_name" VARCHAR(50) NOT NULL,
    "role_desc" VARCHAR(100),
    "is_active" BOOLEAN DEFAULT true,
    "created_date" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36) NOT NULL,
    "modified_date" TIMESTAMPTZ(3),
    "modified_by" VARCHAR(36),

    CONSTRAINT "dt_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dt_user" (
    "id" BIGSERIAL NOT NULL,
    "first_name" VARCHAR(22),
    "last_name" VARCHAR(22),
    "email" VARCHAR(150) NOT NULL,
    "password" TEXT NOT NULL,
    "phone" VARCHAR(30),
    "is_active" BOOLEAN DEFAULT true,
    "role_id" BIGINT,
    "created_date" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36) NOT NULL,
    "modified_date" TIMESTAMPTZ(3),
    "modified_by" VARCHAR(36),

    CONSTRAINT "dt_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dt_role_role_name_key" ON "dt_role"("role_name");

-- CreateIndex
CREATE UNIQUE INDEX "dt_user_email_key" ON "dt_user"("email");

-- AddForeignKey
ALTER TABLE "dt_user" ADD CONSTRAINT "dt_user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "dt_role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
