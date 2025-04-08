// app/admin/dashboard/page.tsx
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Briefcase, Building, MapPin, Search, Settings, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



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
    <div className="flex-1 p-6">
      <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Oportunidades de Estágio</h1>
          <p className="text-muted-foreground">Encontre as melhores oportunidades de estágio para universitários</p>
          <div className="flex items-center justify-end">
               
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="default" className="gap-1 p-2">
                      <div className="relative h-8 w-8 overflow-hidden rounded-full bg-amber-200">
                        
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogoutButton />
                      
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {isAdmin && (
        <Link
          href="/job/new"
        >
          <Button size="lg">
            Gerenciar Oportunidades
          </Button>
        </Link>
      )}
        </header>



      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job: any) => (
          <Card key={job.id} className="h-full flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex flex-row">
                <Building className="h-3.5 w-3.5 mr-1" />
                <CardTitle className="line-clamp-1">{job.title}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  {job.company}
                </CardDescription>
              </div>
              <Badge variant="secondary">{job.category}</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              {job.location}
            </div>
            <p className="text-sm" max-length="50">{job.description}</p>

            <a 
              href="{job.link}"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 underline mt-2 inline-block"
            >
              {job.link}
            </a>
          </CardContent>
          <CardFooter>
            <Link href={`/job/${job.id}`}>
              <Button className="w-full">
                Ver Detalhes
              </Button>
            </Link>            
          </CardFooter>
        </Card>
        ))}
      </div>
    </div>
  );
}
