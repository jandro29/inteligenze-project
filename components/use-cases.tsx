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

// ✅ DATOS DE RESPALDO (los mismos de tu Strapi)
const fallbackData: Hero = {
  titulo1: "Casos de Uso",
  PrimerTitulo: "Transformando Industrias",
  contenido: "Nuestra plataforma IA está diseñada para enfrentar los desafíos únicos de varios sectores.",
  tituloprimercuadro: "Minería",
  contenidoprimercuadro: "Transferencia de conocimiento entre ingenieros, operarios y contratistas de manera ágil. Reportes de sostebilidadautomatizados para auditores y entidades regulatorias",
  titulosegundocuadro: " Manufactura e Ingeniería",
  contenidosegundocuadro: "Procedimientos operativos estándar (SOP) dinámicos y fáciles de seguir. Manuales de producto que se actualizan automáticamente. Documentación de mantenimiento predictivo para maquinaria",
  titulotercercuadro: "Legal y Consultoría",
  contenidotercercuadro: "Documentos legales y compliance siempre en orden. Asistentes IA que ayudan a navegar cláusulas y regulaciones. Repositorios de conocimiento seguro para clientes y equipos.",
  titulocuartocuadro: "Tecnología y Software",
  contenidocuartocuadro: "Documentación técnica para APIs y SDKs, actualizada en segundos. Guías interactivas con asistentes IA para desarrolladores. Colaboración ágil entre producto y soporte.",
  tituloquintocuadro: "Retail y E-commerce",
  contenidoquintocuadro: "Documentación de productos actualizada al instante. Guías interactivas de autoservicio para clientes. Conocimiento compartido entre soporte, ventas y logística.",
  titulosextocuadro: "Banca y Finanzas",
  contenidosextocuadro: "Manuales internos seguros con acceso basado en roles. Flujos automatizados para cumplir normativas (AML, GDPR, Basilea). Soporte a clientes con documentación conversacional en tiempo real.",
};

export default function UseCases() {
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('🔄 Intentando conectar con Strapi...');
        
        // ✅ PRIMERO INTENTA CON STRAPI (usa HTTP, no HTTPS)
        const response = await fetch("http://34.170.207.129:1337/api/cuarto-contenido", { 
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const json = await response.json();
        console.log("✅ Datos obtenidos de Strapi:", json);
        
        if (json.data) {
          setHero(json.data);
          setUsingFallback(false);
        } else {
          throw new Error("Estructura de datos inválida");
        }
        
      } catch (error) {
        console.error("❌ Error con Strapi, usando datos de respaldo:", error);
        // ✅ SI FALLA STRAPI, USA LOS DATOS ESTÁTICOS
        setHero(fallbackData);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-muted/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
                Conectando con Strapi...
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Cargando Casos de Uso
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Obteniendo la información más reciente desde nuestro servidor
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!hero) {
    return (
      <p className="text-center py-20 text-yellow-500">
        ⚠️ No se encontró información para mostrar.
      </p>
    );
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