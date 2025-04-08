"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Briefcase, Building, MapPin, Search, Settings, User, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { signOut } from "next-auth/react";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default function DashboardClient({ jobs }: { jobs: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = Array.from(new Set(jobs.map((job) => job.category)));
  const modes = Array.from(new Set(jobs.map((job) => job.mode)));


  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || selectedCategory === "all" || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex min-h-screen bg-background">



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
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Configurações</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogoutButton />                      
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
        </header>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar por título..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Todas as categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card key={job.id} className="h-full flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex flex-row">
                    <Building className="h-3.5 w-3.5 mr-1" />
                    <CardTitle className="line-clamp-1">{job.title}</CardTitle>
                  </div>
                  <Badge variant="secondary">{job.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  {job.location}
                </div>

                <a 
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 underline mt-2 inline-block"
                >
                  {job.link}
                </a>
              </CardContent>
              <CardFooter>
              <Link href={`/job/${job.id}`} className="w-full">
                <Button className="w-full">
                  Ver Detalhes
                </Button>
              </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-medium">Nenhuma oportunidade encontrada</h3>
                <p className="text-muted-foreground mt-1">Tente ajustar seus filtros de busca</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
