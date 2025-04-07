'use client'

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const CreateJobForm = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("TECNOLOGIA")
  const [location, setLocation] = useState("")
  const [link, setLink] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("/api/job", {
      method: "POST",
      body: JSON.stringify({
        title,
        category,
        description,
        location,
        link
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (res.ok) {
      alert("Job criado com sucesso!")
      setTitle("")
      setDescription("")
      setCategory("TECNOLOGIA")
      setLocation("")
      setLink("")
    } else {
      alert("Erro ao criar job")
    }
  }

  const categories = [
    { value: "TECNOLOGIA", label: "Tecnologia" },
    { value: "EXATAS", label: "Exatas" },
    { value: "HUMANAS", label: "Humanas" },
    { value: "CIENCIAS", label: "Ciências" },
    { value: "ENGENHARIA", label: "Engenharia" },
  ]

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4>">
      <Card className="w-full max-w-2xl">
      <CardHeader>
          <CardTitle className="text-2xl font-bold">Cadastro</CardTitle>
          <CardDescription>Preencha os campos abaixo para criar um novo registro.</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título</Label>
            <Input 
              id="titulo"
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required 
              />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea 
              id="descricao" 
              placeholder="Digite a descrição detalhada"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="localizacao">Localização</Label>
            <Input 
            id="localizacao" 
            placeholder="Digite a localização"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded"
            required 
                     
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">Link</Label>
            <Input 
              id="link" 
              placeholder="https://exemplo.com" 
              required 
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoria">Categoria</Label>
            <Select value={category} onValueChange={(value) => setCategory(value)}>
              <SelectTrigger id="categoria" className="w-full">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
 

        <CardFooter>
        <Button
        type="submit"
        className="w-full mt-4" size="lg"
      >
        Criar Job
      </Button>
        </CardFooter>

        </form>
      </Card>

      


    </div>
    
  )
}

export default CreateJobForm
