import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  // Verifica se o e-mail já está cadastrado
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "Email já cadastrado." }, { status: 400 });
  }

  // Criptografa a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Salva no banco
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return NextResponse.json({ user });
}

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
