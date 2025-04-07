import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import DashboardClient from "./DashboardClient";

export default async function Dashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <DashboardClient jobs={jobs} />;
}
