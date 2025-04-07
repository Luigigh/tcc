"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Briefcase, ChevronLeft, Home, LogOut, Menu, Star, User } from "lucide-react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"





export async function UserSidebar() {
  const [isOpen, setIsOpen] = useState(true)

  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login")
  }



  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-40 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-4 w-4" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {/* Sidebar overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-sidebar border-r transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header with user info */}
          <div className="border-b p-4">
            <div className="flex items-center gap-3 mb-4">

              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{session.user.name}</p>
                <p className="text-xs text-muted-foreground">{session.user.email}</p>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto md:hidden" onClick={() => setIsOpen(false)}>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              <User className="mr-2 h-4 w-4" />
              Ver perfil
            </Button>
          </div>

          {/* Navigation links */}
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-2">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-accent text-accent-foreground"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Briefcase className="h-4 w-4" />
                Minhas Candidaturas
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Star className="h-4 w-4" />
                Favoritos
              </Link>
            </nav>
          </div>

          {/* Logout button */}
          <div className="border-t p-4">
            <Button variant="outline" className="w-full justify-start text-muted-foreground">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

