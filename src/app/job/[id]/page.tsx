"use client";

import { Button } from "@/components/ui/button";
import { Briefcase, Building, Calendar, Clock, MapPin, DollarSign, ChevronLeft, Laptop, Clock as DurationIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Job } from "@prisma/client";

export default function JobDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/job/${id}`);
        if (!response.ok) {
          throw new Error("Job não encontrado");
        }
        const data = await response.json();
        setJob(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ocorreu um erro");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Erro</h2>
          <p className="text-muted-foreground">{error}</p>
          <Link href="/dashboard" className="mt-4 inline-block">
            <Button variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Voltar para o dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Job não encontrado</h2>
          <p className="text-muted-foreground">O job solicitado não foi encontrado.</p>
          <Link href="/dashboard" className="mt-4 inline-block">
            <Button variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Voltar para o dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/dashboard">
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <Building className="h-4 w-4 mr-2" />
                {job.category}
              </div>
            </div>
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {job.mode || "Não especificado"}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <div className="space-y-6">
        {/* Seção de Descrição (existente) */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Descrição da Vaga</h2>
          <p className="text-muted-foreground whitespace-pre-line">
            {job.description || "Descrição não disponível"}
          </p>
        </div>

        {/* Nova Seção: Requisitos */}
        {job.requirements && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Requisitos</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {job.requirements.split('\n').map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Nova Seção: Benefícios */}
        {job.benefits && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Benefícios</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {job.benefits.split('\n').map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Nova Seção: Habilidades */}
        {job.skills && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Habilidades Desejadas</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.split(',').map((skill, index) => (
                <span 
                  key={index}
                  className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Localização</h3>
                    <p className="text-muted-foreground">{job.location}</p>
                  </div>
                </div>

                {job.salary && (
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Salário</h3>
                      <p className="text-muted-foreground">{job.salary}</p>
                    </div>
                  </div>
                )}

                {job.mode && (
                  <div className="flex items-center">
                    <Laptop className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Modalidade</h3>
                      <p className="text-muted-foreground capitalize">{job.mode.toLowerCase()}</p>
                    </div>
                  </div>
                )}

                {job.duration && (
                  <div className="flex items-center">
                    <DurationIcon className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Duração</h3>
                      <p className="text-muted-foreground">{job.duration}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Postado em</h3>
                    <p className="text-muted-foreground">
                      {new Date(job.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Atualizado em</h3>
                    <p className="text-muted-foreground">
                      {new Date(job.updatedAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                >
                  Acessar Oportunidade
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}