import FeatureCard from "@/components/feature-card"
import {
  BotIcon,
  SparklesIcon,
  DatabaseIcon,
  ShieldIcon,
  FileTextIcon,
  ServerIcon,
  LockIcon,
  ZapIcon,
} from "@/components/feature-icons"

export default function FeaturesSection() {
  const features = [
    {
      icon: <BotIcon />,
      title: "Conversaciones LLM Avanzadas",
      description:
        "Cambia entre diferentes modelos de lenguaje para encontrar el ajuste perfecto para tu caso de uso específico con análisis de rendimiento integrado.",
      accentColor: "rgba(36, 101, 237, 0.5)",
    },
    {
      icon: <SparklesIcon />,
      title: "Agentes Personalizables",
      description:
        "Usa nuestros agentes integrados o crea los tuyos propios para automatizar flujos de trabajo y tareas complejas.",
      accentColor: "rgba(236, 72, 153, 0.5)",
    },
    {
      icon: <DatabaseIcon />,
      title: "Base de Conocimientos Empresarial",
      description: "Gestión segura del conocimiento con controles de acceso granulares y seguimiento de referencias.",
      accentColor: "rgba(34, 211, 238, 0.5)",
    },
    {
      icon: <ShieldIcon />,
      title: "Seguridad Empresarial",
      description: "Cifrado de nivel bancario, controles de cumplimiento y opciones de soberanía de datos.",
      accentColor: "rgba(132, 204, 22, 0.5)",
    },
    {
      icon: <FileTextIcon />,
      title: "Plantillas de Prompts",
      description:
        "Accede a nuestra extensa biblioteca de plantillas de prompts o crea personalizadas para tu organización.",
      accentColor: "rgba(249, 115, 22, 0.5)",
    },
    {
      icon: <ServerIcon />,
      title: "Soporte para Servidores MCP",
      description: "Configura tus propios servidores MCP para un rendimiento y control mejorados.",
      accentColor: "rgba(168, 85, 247, 0.5)",
    },
    {
      icon: <LockIcon />,
      title: "Privacidad de Datos y Cumplimiento",
      description:
        "Cumple con los requisitos regulatorios con características de cumplimiento integrales incluyendo GDPR, HIPAA y SOC 2.",
      accentColor: "rgba(251, 191, 36, 0.5)",
    },
    {
      icon: <ZapIcon />,
      title: "Colaboración en Tiempo Real",
      description:
        "Permite que los equipos trabajen juntos sin problemas con espacios de trabajo compartidos y sesiones colaborativas de IA.",
      accentColor: "rgba(16, 185, 129, 0.5)",
    },
  ]

  return (
    <section className="py-20 bg-muted/50 dark:bg-muted/10" id="features" aria-labelledby="features-heading">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
              Características Clave
            </div>
            <h2 id="features-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Plataforma IA de Nivel Empresarial
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Diseñada específicamente para organizaciones que demandan seguridad, personalización y control.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              accentColor={feature.accentColor}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
