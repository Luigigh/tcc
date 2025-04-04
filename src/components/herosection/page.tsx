import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="w-full px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center space-y-4 text-center"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.6 }}
            className="space-y-2"
          >
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Sua Plataforma Completa
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Transforme sua experiência digital com nossa solução inovadora. Simples, rápida e eficiente.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-x-4"
          >
            <Link href="/">
              <Button size="lg">Começar Agora</Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg">
                Saiba Mais
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
