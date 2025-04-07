'use client'

import { useState } from "react"

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
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md max-w-md mx-auto">
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        placeholder="Localização"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <input
        type="url"
        placeholder="Link externo (ex: LinkedIn)"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded"
      >
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Criar Job
      </button>
    </form>
  )
}

export default CreateJobForm
