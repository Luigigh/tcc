"use client"

import { signOut } from "next-auth/react"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"

export default function LogoutButton() {
    return (
        <Button
            size="sm"
            variant="outline"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2"
        >
            <LogOut size={16} />
            <span>Sair</span>
        </Button>
    )
}
