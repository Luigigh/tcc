import LogoutButton from "@/components/LogoutButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function Dashboard() {
    
    const session = await getServerSession();

    if (!session) {
        redirect("/");
    }
    
    const jobs = await prisma.job.findMany({
        orderBy: { createdAt: "desc" },
      });
    


    return (
        <div>

              <p>Dashboard</p>
            <p>Olá, {session.user?.name}</p>
          
            <p>Email: {session.user?.email}</p>
            <div>
            <LogoutButton />

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
        </div>
    )
}