import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-8">
      <div className="w-full flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8 p-4">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} LandingPage. Todos os direitos reservados.
        </p>
        <div className="flex gap-4">
          <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            Termos
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            Privacidade
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            Contato
          </Link>
        </div>
      </div>
    </footer>
  )
}