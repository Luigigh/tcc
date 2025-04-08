// app/api/job/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const job = await prisma.job.findUnique({
      where: {
        id: parseInt(params.id), // Convertendo para número pois seu ID é Int
      },
    });

    if (!job) {
      return NextResponse.json(
        { error: "Job não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar job" },
      { status: 500 }
    );
  }
}

// Opcional: Adicionar PUT e DELETE se precisar
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();
  
  if (!session || session.user?.email !== "admin@interin.com") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  const data = await request.json();
  
  try {
    const updatedJob = await prisma.job.update({
      where: { id: parseInt(params.id) },
      data: data
    });
    return NextResponse.json(updatedJob);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar job" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();
  
  if (!session || session.user?.email !== "admin@interin.com") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  try {
    await prisma.job.delete({
      where: { id: parseInt(params.id) }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar job" },
      { status: 500 }
    );
  }
}