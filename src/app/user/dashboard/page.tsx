import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import DashboardClient from "../../dashboard/DashboardClient";

export default async function Dashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  if (session.user?.email === "admin@interin.com") {
    redirect("/admin/dashboard");
  }

  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <DashboardClient jobs={jobs} />;
}
