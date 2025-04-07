"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Building, MapPin, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { UserSidebar } from "@/components/UserSidebar";



export default function DashboardClient({ jobs }: { jobs: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");


  const categories = Array.from(new Set(jobs.map((job) => job.category)));


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
                  <div>
                    <CardTitle className="line-clamp-1">{job.title}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Building className="h-3.5 w-3.5 mr-1" />
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
                <Button className="w-full">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Candidatar-se
                </Button>
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
