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

interface Hero {
  titulo1: string;
  PrimerTitulo: string;
  contenido: string;
}

export default async function FeaturesSection() {

   const res = await fetch("http://34.170.207.129:1337/api/segundo-contenedor", {
    cache: "no-store",
  });


  const json = await res.json();

  const hero: Hero | undefined = json.data;

  const features = [
    {
      icon: <BotIcon />,
      title: json.data?.titulocuadro1,
      description:json.data?.contenidocuadro1,
      accentColor: "rgba(36, 101, 237, 0.5)",
    },
    {
      icon: <SparklesIcon />,
      title: json.data?.titulocuadro2,
      description:json.data?.contenidocuadro2,
      accentColor: "rgba(236, 72, 153, 0.5)",
    },
    {
      icon: <DatabaseIcon />,
      title: json.data?.titulocuadro3,
      description: json.data?.contenidocuadro3,
      accentColor: "rgba(34, 211, 238, 0.5)",
    },
    {
      icon: <ShieldIcon />,
      title: json.data?.titulocuadro4,
      description: json.data?.contenidocuadro4,
      accentColor: "rgba(132, 204, 22, 0.5)",
    },
    {
      icon: <FileTextIcon />,
      title: json.data?.titulocuadro5,
      description:json.data?.contenidocuadro5,
      accentColor: "rgba(249, 115, 22, 0.5)",
    },
    {
      icon: <ServerIcon />,
      title: json.data?.titulocuadro6,
      description: json.data?.contenidocuadro6,
      accentColor: "rgba(168, 85, 247, 0.5)",
    },
    {
      icon: <LockIcon />,
      title: json.data?.titulocuadro7,
      description:json.data?.contenidocuadro7,
      accentColor: "rgba(251, 191, 36, 0.5)",
    },
    {
      icon: <ZapIcon />,
      title: json.data?.titulocuadro8,
      description:json.data?.contenidocuadro8,
      accentColor: "rgba(16, 185, 129, 0.5)",
    },
  ]

  return (
    <section className="py-20 bg-muted/50 dark:bg-muted/10" id="features" aria-labelledby="features-heading">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
              {hero?.titulo1 ?? "No hay subtítulo"}
            </div>
            <h2 id="features-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
               {hero?.PrimerTitulo ?? "No hay subtítulo"}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {hero?.contenido ?? "No hay subtítulo"}
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
