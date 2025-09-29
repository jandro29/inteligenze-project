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
  tituloprimercuadro: string;
  contenidoprimercuadro: string;
  titulosegundocuadro: string;
  contenidosegundocuadro: string;
  titulotercercuadro: string;
  contenidotercercuadro: string;
  titulocuartocuadro: string;
  contenidocuartocuadro: string;
  tituloquintocuadro: string;
  contenidoquintocuadro: string;
  titulosextocuadro: string;
  contenidosextocuadro: string;
}

export default function UseCases() {
  const [hero, setHero] = useState<Hero | null>(null);

  useEffect(() => {
    fetch("http://34.170.207.129:1337/api/cuarto-contenido", {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("📦 JSON recibido:", json);

        // Caso 1: API devuelve los campos directo dentro de `data`
        if (json?.data && !json?.data?.attributes) {
          setHero(json.data);
        }
        // Caso 2: API devuelve los campos dentro de `attributes`
        else if (json?.data?.attributes) {
          setHero(json.data.attributes);
        } else {
          console.warn("⚠️ Estructura inesperada en la API");
        }
      })
      .catch((err) => console.error("❌ Error al traer data de Strapi:", err));
  }, []);

  if (!hero) {
    return <p className="text-center py-20">Cargando contenido...</p>;
  }

  const useCases = [
    {
      icon: <BuildingIcon />,
      title: hero.tituloprimercuadro,
      description: hero.contenidoprimercuadro,
      accentColor: "rgba(59, 130, 246, 0.5)",
    },
    {
      icon: <GovernmentIcon />,
      title: hero.titulosegundocuadro,
      description: hero.contenidosegundocuadro,
      accentColor: "rgba(139, 92, 246, 0.5)",
    },
    {
      icon: <FinanceIcon />,
      title: hero.titulotercercuadro,
      description: hero.contenidotercercuadro,
      accentColor: "rgba(245, 158, 11, 0.5)",
    },
    {
      icon: <HealthcareIcon />,
      title: hero.titulocuartocuadro,
      description: hero.contenidocuartocuadro,
      accentColor: "rgba(239, 68, 68, 0.5)",
    },
    {
      icon: <LegalIcon />,
      title: hero.tituloquintocuadro,
      description: hero.contenidoquintocuadro,
      accentColor: "rgba(132, 204, 22, 0.5)",
    },
    {
      icon: <EducationIcon />,
      title: hero.titulosextocuadro,
      description: hero.contenidosextocuadro,
      accentColor: "rgba(14, 165, 233, 0.5)",
    },
  ];

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
              {hero.titulo1}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {hero.PrimerTitulo}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {hero.contenido}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {useCases.map((useCase, index) => (
            <motion.div key={index}>
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
