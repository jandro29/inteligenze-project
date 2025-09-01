"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FrostedGlassIcon from "@/components/frosted-glass-icon";
import {
  BuildingIcon,
  GovernmentIcon,
  FinanceIcon,
  HealthcareIcon,
  LegalIcon,
  EducationIcon,
} from "@/components/use-case-icons";
import { useEffect, useState } from "react";

interface Hero {
  titulo: string;
  subtitulo: string;
  primertitulobox: string;
  primercontenidobox: string;
  segundotitulobox: string;
  segundocontenidobox: string;
  tercertitulobox: string;
  tercercontenidobox: string;
  cuartotitulobox: string;
  cuartocontenidobox: string;
  quintotitulobox: string;
  quintocontenidobox: string;
  sextotitulobox: string;
  sextocontenidobox: string;
}

export default function UseCases() {
  const [hero, setHero] = useState<Hero | null>(null);

  useEffect(() => {
    fetch("http://35.238.156.185:1337/api/foursection", { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => {
        console.log(" JSON recibido:", json);
        setHero(json.data); 
      })
      .catch((err) => console.error(err));
  }, []);

  const useCases = [
    {
      icon: <BuildingIcon />,
      title: hero?.primertitulobox ?? "Cargando...",
      description: hero?.primercontenidobox ?? "Esperando contenido...",
      accentColor: "rgba(59, 130, 246, 0.5)",
    },
    {
      icon: <GovernmentIcon />,
      title: hero?.segundotitulobox ?? "Cargando...",
      description: hero?.segundocontenidobox ?? "Esperando contenido...",
      accentColor: "rgba(139, 92, 246, 0.5)",
    },
    {
      icon: <FinanceIcon />,
      title: hero?.tercertitulobox ?? "Cargando...",
      description: hero?.tercercontenidobox ?? "Esperando contenido...",
      accentColor: "rgba(245, 158, 11, 0.5)",
    },
    {
      icon: <HealthcareIcon />,
      title: hero?.cuartotitulobox ?? "Cargando...",
      description: hero?.cuartocontenidobox ?? "Esperando contenido...",
      accentColor: "rgba(239, 68, 68, 0.5)",
    },
    {
      icon: <LegalIcon />,
      title: hero?.quintotitulobox ?? "Cargando...",
      description: hero?.quintocontenidobox ?? "Esperando contenido...",
      accentColor: "rgba(132, 204, 22, 0.5)",
    },
    {
      icon: <EducationIcon />,
      title: hero?.sextotitulobox ?? "Cargando...",
      description: hero?.sextocontenidobox ?? "Esperando contenido...",
      accentColor: "rgba(14, 165, 233, 0.5)",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-muted/10">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
              Casos de Uso
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {hero?.titulo ?? "Cargando..."}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {hero?.subtitulo ?? "Esperando subtítulo..."}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {useCases.map((useCase, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full bg-background/60 backdrop-blur-sm border transition-all duration-300 hover:shadow-lg dark:bg-background/80">
                <CardHeader className="pb-2">
                  <FrostedGlassIcon
                    icon={useCase.icon}
                    color={useCase.accentColor}
                    className="mb-4"
                  />
                  <CardTitle>{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {useCase.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
