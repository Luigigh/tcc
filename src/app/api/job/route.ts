// app/api/job/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession();

  if (!session || session.user?.email !== "admin@interin.com") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  const { title, category, description, location, link } = await req.json();

  const job = await prisma.job.create({
    data: {
      title,
      category,
      description,
      location,
      link
    },
  });

  return NextResponse.json(job);
}
