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

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Hero {
  titulo1: string;
  PrimerTitulo: string;
  contenido: string;
  image1: ImageBitmap;
  tituloprimercuadro: string;
  contenidoprimercuadro: string;
  image2: ImageBitmap;
  titulosegundocuadro: string;
  contenidosegundocuadro: string;
  image3: ImageBitmap;
  titulotercercuadro: string;
  contenidotercercuadro: string;
  image4: ImageBitmap;
  titulocuartocuadro: string;
  contenidocuartocuadro: string;
  image5: ImageBitmap;
  tituloquintocuadro: string;
  contenidoquintocuadro: string;
  image6: ImageBitmap;
  titulosextocuadro: string;
  contenidosextocuadro: string;
}

export default function UseCases() {
  const [hero, setHero] = useState<Hero | null>(null);

  useEffect(() => {
    fetch("http://34.170.207.129:1337/api/cuarto-contenido?populate=*", {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("JSON recibido:", json);
        setHero(json.data || null);
      })
      .catch((err) => console.error("Error al traer data de Strapi:", err));
  }, []);

  const useCases = [
    {
      icon: <BuildingIcon />,
      title: hero?.tituloprimercuadro ?? "Cargando...",
      description: hero?.contenidoprimercuadro ?? "Esperando contenido...",
      accentColor: "rgba(59, 130, 246, 0.5)",
    },
    {
      icon: <GovernmentIcon />,
      title: hero?.titulosegundocuadro ?? "Cargando...",
      description: hero?.contenidosegundocuadro ?? "Esperando contenido...",
      accentColor: "rgba(139, 92, 246, 0.5)",
    },
    {
      icon: <FinanceIcon />,
      title: hero?.titulotercercuadro ?? "Cargando...",
      description: hero?.contenidotercercuadro ?? "Esperando contenido...",
      accentColor: "rgba(245, 158, 11, 0.5)",
    },
    {
      icon: <HealthcareIcon />,
      title: hero?.titulocuartocuadro ?? "Cargando...",
      description: hero?.contenidocuartocuadro ?? "Esperando contenido...",
      accentColor: "rgba(239, 68, 68, 0.5)",
    },
    {
      icon: <LegalIcon />,
      title: hero?.tituloquintocuadro ?? "Cargando...",
      description: hero?.contenidoquintocuadro ?? "Esperando contenido...",
      accentColor: "rgba(132, 204, 22, 0.5)",
    },
    {
      icon: <EducationIcon />,
      title: hero?.titulosextocuadro ?? "Cargando...",
      description: hero?.contenidosextocuadro ?? "Esperando contenido...",
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
              {hero?.titulo1 ?? "Cargando..."}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {hero?.PrimerTitulo ?? "Cargando..."}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {hero?.contenido ?? "Esperando subtítulo..."}
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
