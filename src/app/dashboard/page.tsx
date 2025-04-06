import LogoutButton from "@/components/LogoutButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    
    const session = await getServerSession();

    if (!session) {
        redirect("/");
    }
    
    return (
        <div>

              <p>Dashboard</p>
            <p>Olá, {session.user?.name}</p>
          
            <p>Email: {session.user?.email}</p>
            <div>
            <LogoutButton />

            </div>
        </div>
    )
}