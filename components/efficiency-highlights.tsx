"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  CheckCircle,
  Clock,
  DollarSign,
  Zap,
  Users,
  Target,
  BarChart3,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Hero {
  titulo: string;
  subtitulo: string;
  estadisticabox1: string;
  titulobox1: string;
  contenidobox1: string;
  estadisticabox2: string;
  titulobox2: string;
  contenidobox2: string;
  estadisticabox3: string;
  titulobox3: string;
  contenidobox3: string;
  estadisticabox4: string;
  titulobox4: string;
  contenidobox4: string;
  estadisticabox5: string;
  titulobox5: string;
  contenidobox5: string;
  estadisticabox6: string;
  titulobox6: string;
  contenidobox6: string;
  estadisticabox7: string;
  titulobox7: string;
  contenidobox7: string;
  estadisticabox8: string;
  titulobox8: string;
  contenidobox8: string;
}

export default function EfficiencyHighlights() {
  const [hero, setHero] = useState<Hero | null>(null);

  useEffect(() => {
    fetch("http://35.238.156.185:1337/api/sixsection", { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => {
        console.log(" JSON recibido:", json);
        setHero(json.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const metrics = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      value: hero?.estadisticabox1 ?? "Cargando...",
      label: hero?.titulobox1 ?? "Cargando...",
      description: hero?.contenidobox1 ?? "Cargando...",
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      trend: "+12%",
      trendColor: "text-emerald-600",
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      value: hero?.estadisticabox2 ?? "Cargando...",
      label: hero?.titulobox2 ?? "Cargando...",
      description: hero?.contenidobox2 ?? "Cargando...",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      trend: "+5.2%",
      trendColor: "text-blue-600",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      value: hero?.estadisticabox3 ?? "Cargando...",
      label: hero?.titulobox3 ?? "Cargando...",
      description: hero?.contenidobox3 ?? "Cargando...",
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      iconColor: "text-purple-600 dark:text-purple-400",
      trend: "+0.1%",
      trendColor: "text-purple-600",
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      value: hero?.estadisticabox4 ?? "Cargando...",
      label: hero?.titulobox4 ?? "Cargando...",
      description: hero?.contenidobox4 ?? "Cargando...",
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
      iconColor: "text-amber-600 dark:text-amber-400",
      trend: "+8%",
      trendColor: "text-amber-600",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      value: hero?.estadisticabox5 ?? "Cargando...",
      label: hero?.titulobox5 ?? "Cargando...",
      description: hero?.contenidobox5 ?? "Cargando...",
      color: "from-cyan-500 to-teal-600",
      bgColor: "bg-cyan-50 dark:bg-cyan-950/20",
      iconColor: "text-cyan-600 dark:text-cyan-400",
      trend: "-0.8s",
      trendColor: "text-cyan-600",
    },
    {
      icon: <Users className="h-8 w-8" />,
      value: hero?.estadisticabox6 ?? "Cargando...",
      label: hero?.titulobox6 ?? "Cargando...",
      description: hero?.contenidobox6 ?? "Cargando...",
      color: "from-rose-500 to-pink-600",
      bgColor: "bg-rose-50 dark:bg-rose-950/20",
      iconColor: "text-rose-600 dark:text-rose-400",
      trend: "+2.1K",
      trendColor: "text-rose-600",
    },
    {
      icon: <Target className="h-8 w-8" />,
      value: hero?.estadisticabox7 ?? "Cargando...",
      label: hero?.titulobox7 ?? "Cargando...",
      description: hero?.contenidobox7 ?? "Cargando...",
      color: "from-violet-500 to-purple-600",
      bgColor: "bg-violet-50 dark:bg-violet-950/20",
      iconColor: "text-violet-600 dark:text-violet-400",
      trend: "+3%",
      trendColor: "text-violet-600",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      value: hero?.estadisticabox8 ?? "Cargando...",
      label: hero?.titulobox8 ?? "Cargando...",
      description: hero?.contenidobox8 ?? "Cargando...",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      iconColor: "text-green-600 dark:text-green-400",
      trend: "+23%",
      trendColor: "text-green-600",
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
              Métricas de Rendimiento
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {hero?.titulo ?? "Cargando..."}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {hero?.subtitulo ?? "Cargando..."}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {metrics.map((metric, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="group relative overflow-hidden bg-background/60 backdrop-blur-sm border transition-all duration-300 hover:shadow-xl hover:scale-105 dark:bg-background/80">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl ${metric.bgColor} transition-all duration-300 group-hover:scale-110`}
                    >
                      <div className={metric.iconColor}>{metric.icon}</div>
                    </div>
                    <div
                      className={`text-sm font-medium px-2 py-1 rounded-full bg-gradient-to-r ${metric.color} text-white`}
                    >
                      {metric.trend}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-3xl font-bold tracking-tight">
                      {metric.value}
                    </div>
                    <div className="text-lg font-semibold text-foreground">
                      {metric.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {metric.description}
                    </div>
                  </div>

                  {/* Gradiente de fondo animado */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${
                        metric.color.split(" ")[1]
                      } 0%, ${metric.color.split(" ")[3]} 100%)`,
                    }}
                    initial={false}
                    whileHover={{ opacity: 0.1 }}
                  />

                  {/* Animación de pulso al hacer hover */}
                  <motion.div
                    className="absolute inset-0 rounded-lg border-2 border-transparent"
                    whileHover={{
                      borderColor: `${
                        metric.iconColor.includes("emerald")
                          ? "#10b981"
                          : metric.iconColor.includes("blue")
                          ? "#3b82f6"
                          : metric.iconColor.includes("purple")
                          ? "#8b5cf6"
                          : metric.iconColor.includes("amber")
                          ? "#f59e0b"
                          : metric.iconColor.includes("cyan")
                          ? "#06b6d4"
                          : metric.iconColor.includes("rose")
                          ? "#f43f5e"
                          : metric.iconColor.includes("violet")
                          ? "#8b5cf6"
                          : "#10b981"
                      }`,
                      scale: 1.02,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Barra de estadísticas adicionales */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">
              Clientes Empresariales
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">
              Soporte Disponible
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary">99.9%</div>
            <div className="text-sm text-muted-foreground">Garantía SLA</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary">ISO 27001</div>
            <div className="text-sm text-muted-foreground">
              Seguridad Certificada
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
