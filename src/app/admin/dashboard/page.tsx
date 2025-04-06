// app/admin/dashboard/page.tsx
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { useState } from "react";



export default async function AdminDashboardPage() {
  const session = await getServerSession();

  if (!session?.user) {
    return <div className="p-4">Acesso negado. Faça login.</div>;
  }

  const isAdmin = session.user.email === "admin@interin.com";

  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
  });


  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Painel de Jobs</h1>

      <LogoutButton />


      {isAdmin && (
        <Link
          href="/job/new"
          className="inline-block mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Criar novo Job
        </Link>
      )}

      <div className="grid gap-4">
        {jobs.map((job: any) => (
          <div key={job.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-sm text-gray-600 mb-2">
              Categoria: {job.category}
            </p>
            <p>{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
