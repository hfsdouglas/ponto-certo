-- CreateEnum
CREATE TYPE "Dia" AS ENUM ('domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado');

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "nome_completo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "funcionario" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "hora_extra" BOOLEAN DEFAULT false,

    CONSTRAINT "funcionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carga_horaria" (
    "id" TEXT NOT NULL,
    "funcionario_id" TEXT NOT NULL,
    "dia" "Dia" NOT NULL,
    "entrada" TIMESTAMP(3) NOT NULL,
    "saida" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carga_horaria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ponto" (
    "id" TEXT NOT NULL,
    "funcionario_id" TEXT NOT NULL,
    "dia" "Dia" NOT NULL,
    "entrada" TIMESTAMP(3) NOT NULL,
    "saida" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ponto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "funcionario" ADD CONSTRAINT "funcionario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carga_horaria" ADD CONSTRAINT "carga_horaria_funcionario_id_fkey" FOREIGN KEY ("funcionario_id") REFERENCES "funcionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ponto" ADD CONSTRAINT "ponto_funcionario_id_fkey" FOREIGN KEY ("funcionario_id") REFERENCES "funcionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
