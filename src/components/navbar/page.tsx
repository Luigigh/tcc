"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex h-16 items-center justify-between p-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">InterIn</span>
        </Link>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link href="/" className="text-sm font-medium hover:underline">
            Inicio
          </Link>
          <Link href="#features" className="text-sm font-medium hover:underline">
            Recursos
          </Link>
          <div className="flex items-center space-x-2">
            
            <Link href="/login">
              <Button variant="outline" size="lg">
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg">Cadastrar</Button>
            </Link>
          </div>
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden">
            <div className="container p-4 space-y-4">
              <Link href="/" className="block text-sm font-medium hover:underline" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link
                href="#features"
                className="block text-sm font-medium hover:underline"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <div className="flex flex-col space-y-2">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
                
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}