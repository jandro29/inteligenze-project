"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Hero {
  FAQ: string;
  PrimerTitulo: string;
  contenido: string;
  pregunta1: string;
  respuesta1: string;
  pregunta2: string;
  respuesta2: string;
  pregunta3: string;
  respuesta3: string;
  pregunta4: string;
  respuesta4: string;
  pregunta5: string;
  respuesta5: string;
  pregunta6: string;
  respuesta6: string;
  pregunta7: string;
  respuesta7: string;
  pregunta8: string;
  respuesta8: string;
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function FAQSection() {
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Usa el proxy de Next.js para evitar problemas de mixed content
    const fullUrl = `/api/strapi-proxy?endpoint=/api/septimo-contenedor`;
    
    console.log("🔍 Intentando cargar desde proxy:", fullUrl);
    console.log("🌍 Environment:", process.env.NODE_ENV);
    
    setLoading(true);
    setError(null);
    
    fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })
      .then((res) => {
        console.log("📡 Respuesta recibida:", res.status, res.statusText);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status} - ${res.statusText}`);
        }
        return res.json();
      })
      .then((json) => {
        console.log("✅ JSON recibido:", json);
        if (json.data) {
          setHero(json.data);
          console.log("✅ Hero data actualizada:", json.data);
        } else {
          console.warn("⚠️ No hay 'data' en la respuesta:", json);
          setError("Estructura de datos incorrecta");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching data:", err);
        console.error("❌ Error completo:", err.message);
        setError(`Error: ${err.message} - URL: ${fullUrl}`);
        setLoading(false);
      });
  }, []);

  const [openItems, setOpenItems] = useState<number[]>([0]);

  const faqs = [
    {
      question: hero?.pregunta1 ?? "¿Pregunta no disponible?",
      answer: hero?.respuesta1 ?? "Respuesta no disponible.",
    },
    {
      question: hero?.pregunta2 ?? "¿Pregunta no disponible?",
      answer: hero?.respuesta2 ?? "Respuesta no disponible.",
    },
    {
      question: hero?.pregunta3 ?? "¿Pregunta no disponible?",
      answer: hero?.respuesta3 ?? "Respuesta no disponible.",
    },
    {
      question: hero?.pregunta4 ?? "¿Pregunta no disponible?",
      answer: hero?.respuesta4 ?? "Respuesta no disponible.",
    },
    {
      question: hero?.pregunta5 ?? "¿Pregunta no disponible?",
      answer: hero?.respuesta5 ?? "Respuesta no disponible.",
    },
    {
      question: hero?.pregunta6 ?? "¿Pregunta no disponible?",
      answer: hero?.respuesta6 ?? "Respuesta no disponible.",
    },
    {
      question: hero?.pregunta7 ?? "¿Pregunta no disponible?",
      answer: hero?.respuesta7 ?? "Respuesta no disponible.",
    },
    {
      question: hero?.pregunta8 ?? "¿Pregunta no disponible?",
      answer: hero?.respuesta8 ?? "Respuesta no disponible.",
    },
  ];

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

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

  // Mostrar error si hay uno
  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center text-red-500">
            <p>Error al cargar las preguntas frecuentes: {error}</p>
            <p className="text-sm mt-2">Por favor, intenta recargar la página.</p>
          </div>
        </div>
      </section>
    );
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
            <div className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
              <HelpCircle className="h-4 w-4" />
              {loading ? "Cargando..." : (hero?.FAQ ?? "FAQ")}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {loading ? "Cargando preguntas..." : (hero?.PrimerTitulo ?? "Preguntas Frecuentes")}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {loading ? "Obteniendo información..." : (hero?.contenido ?? "Encuentra respuestas a las preguntas más comunes")}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="overflow-hidden bg-background/60 backdrop-blur-sm border transition-all duration-300 hover:shadow-lg dark:bg-background/80">
                <motion.button
                  className="w-full text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
                  onClick={() => toggleItem(index)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={loading}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold pr-4 leading-relaxed">
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{
                          rotate: openItems.includes(index) ? 180 : 0,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      </motion.div>
                    </div>
                  </CardContent>
                </motion.button>

                <AnimatePresence>
                  {openItems.includes(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <CardContent className="px-6 pb-6 pt-0">
                        <motion.div
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                          className="border-t pt-4"
                        >
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 pointer-events-none"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span>¿Aún tienes preguntas?</span>
            <a
              href="#contact"
              className="text-primary hover:underline font-medium transition-colors duration-200"
            >
              Contacta a nuestro equipo de soporte
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}