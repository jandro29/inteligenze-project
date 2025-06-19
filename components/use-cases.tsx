"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import FrostedGlassIcon from "@/components/frosted-glass-icon"
import {
  BuildingIcon,
  GovernmentIcon,
  FinanceIcon,
  HealthcareIcon,
  LegalIcon,
  EducationIcon,
} from "@/components/use-case-icons"

export default function UseCases() {
  const useCases = [
    {
      icon: <BuildingIcon />,
      title: "Gestión del Conocimiento Empresarial",
      description:
        "Centraliza el conocimiento organizacional y habilita búsqueda y recuperación impulsada por IA en todas tus fuentes de datos.",
      accentColor: "rgba(59, 130, 246, 0.5)",
    },
    {
      icon: <GovernmentIcon />,
      title: "Operaciones Gubernamentales",
      description:
        "Optimiza procesos, mejora servicios ciudadanos y mejora la toma de decisiones con soluciones IA seguras.",
      accentColor: "rgba(139, 92, 246, 0.5)",
    },
    {
      icon: <FinanceIcon />,
      title: "Servicios Financieros",
      description:
        "Mejora el cumplimiento, evaluación de riesgos y servicio al cliente con IA que respeta estrictos requisitos de seguridad de datos.",
      accentColor: "rgba(245, 158, 11, 0.5)",
    },
    {
      icon: <HealthcareIcon />,
      title: "Salud",
      description:
        "Mejora la atención al paciente y eficiencia operacional mientras mantienes el cumplimiento HIPAA y privacidad de datos.",
      accentColor: "rgba(239, 68, 68, 0.5)",
    },
    {
      icon: <LegalIcon />,
      title: "Legal",
      description:
        "Acelera la investigación legal, análisis de contratos y preparación de casos con asistencia IA segura y precisa.",
      accentColor: "rgba(132, 204, 22, 0.5)",
    },
    {
      icon: <EducationIcon />,
      title: "Educación",
      description:
        "Transforma experiencias de aprendizaje y procesos administrativos con soluciones IA personalizables.",
      accentColor: "rgba(14, 165, 233, 0.5)",
    },
  ]

  // Variantes de animación para contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  // Variantes de animación para elementos individuales
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
  }

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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Transformando Industrias</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Nuestra plataforma IA está diseñada para enfrentar los desafíos únicos de varios sectores.
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
                  <FrostedGlassIcon icon={useCase.icon} color={useCase.accentColor} className="mb-4" />
                  <CardTitle>{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{useCase.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
