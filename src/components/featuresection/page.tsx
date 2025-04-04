"use client";

import { motion } from "framer-motion";
import { Zap, Shield, BarChart, Users } from "lucide-react";

export function FeaturesSection() {
  return (
    <motion.section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="w-full px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Recursos Poderosos
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Nossa plataforma oferece tudo que você precisa para ter sucesso
            </p>
          </motion.div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 pt-8">
          {[
            { icon: <Zap className="h-6 w-6 text-primary" />, title: "Desempenho Rápido", desc: "Otimizado para velocidade e eficiência, garantindo uma experiência fluida." },
            { icon: <Shield className="h-6 w-6 text-primary" />, title: "Segurança Avançada", desc: "Proteção de dados com criptografia e autenticação segura." },
            { icon: <BarChart className="h-6 w-6 text-primary" />, title: "Análises Detalhadas", desc: "Insights valiosos com relatórios personalizados e métricas em tempo real." },
            { icon: <Users className="h-6 w-6 text-primary" />, title: "Colaboração em Equipe", desc: "Ferramentas integradas para aumentar a produtividade da equipe." },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="rounded-full bg-primary/10 p-3">{feature.icon}</div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground text-center">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
