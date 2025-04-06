"use client"

import { FormEvent, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"



export function LoginForms() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams();
    const error = searchParams.get('error')

    async function login(e: FormEvent<HTMLFormElement>) {

        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);


        const data = {
            email: formData.get("email"),
            password: formData.get("password")
        }


        signIn("credentials", {
            ...data,            
            callbackUrl: "/dashboard"
        })
        
    } 

    return (
        
        <form onSubmit={login} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
            {error === "CredentialsSignin" && <div className="text-red-400 text-center">Email ou senha incorretos.</div>}
          </form>
        
    )
}