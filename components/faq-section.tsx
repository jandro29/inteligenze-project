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

export default function FAQSection() {
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('🔄 Iniciando fetch a Strapi...');
        
        const response = await fetch("http://34.170.207.129:1337/api/septimo-contenedor", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          mode: 'cors', // Añadir explícitamente
          cache: "no-cache",
        });

        console.log('📡 Response status:', response.status);
        console.log('📡 Response ok:', response.ok);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ Error response:', errorText);
          throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
        }

        const json = await response.json();
        console.log("✅ JSON recibido:", json);
        
        // Verifica diferentes estructuras posibles de respuesta
        if (json.data && json.data.attributes) {
          setHero(json.data.attributes);
        } else if (json.attributes) {
          setHero(json.attributes);
        } else if (json) {
          // Si la respuesta viene directamente
          setHero(json);
        } else {
          throw new Error("Estructura de datos inesperada");
        }
      } catch (err) {
        console.error("❌ Error completo:", err);
        setError(err instanceof Error ? err.message : "Error de conexión con el servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [openItems, setOpenItems] = useState<number[]>([0]);

  // Datos de fallback en caso de error
  const fallbackFAQs = [
    {
      question: "¿Qué es Inteligence?",
      answer: "Inteligence es una plataforma de IA diseñada para transformar cómo las organizaciones manejan el conocimiento y la atención al cliente."
    },
    {
      question: "¿Cómo puedo integrar la plataforma?",
      answer: "Ofrecemos múltiples opciones de integración con tus sistemas existentes a través de nuestra API y conectores preconstruidos."
    },
    {
      question: "¿Qué tipo de soporte ofrecen?",
      answer: "Proporcionamos soporte técnico especializado, documentación completa y asistencia personalizada para implementaciones empresariales."
    }
  ];

  const faqs = hero ? [
    { question: hero.pregunta1 || "Pregunta 1", answer: hero.respuesta1 || "Respuesta 1" },
    { question: hero.pregunta2 || "Pregunta 2", answer: hero.respuesta2 || "Respuesta 2" },
    { question: hero.pregunta3 || "Pregunta 3", answer: hero.respuesta3 || "Respuesta 3" },
    { question: hero.pregunta4 || "Pregunta 4", answer: hero.respuesta4 || "Respuesta 4" },
    { question: hero.pregunta5 || "Pregunta 5", answer: hero.respuesta5 || "Respuesta 5" },
    { question: hero.pregunta6 || "Pregunta 6", answer: hero.respuesta6 || "Respuesta 6" },
    { question: hero.pregunta7 || "Pregunta 7", answer: hero.respuesta7 || "Respuesta 7" },
    { question: hero.pregunta8 || "Pregunta 8", answer: hero.respuesta8 || "Respuesta 8" },
  ] : fallbackFAQs;

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  // ... (el resto de tu código de animaciones y renderizado se mantiene igual)
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

  // Mostrar estado de carga
  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-muted/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
                <HelpCircle className="h-4 w-4" />
                Cargando...
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Cargando preguntas frecuentes...
              </h2>
            </div>
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
              {hero?.FAQ || "Preguntas Frecuentes"}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {hero?.PrimerTitulo || "Preguntas Frecuentes"}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {hero?.contenido || "Encuentra respuestas a las preguntas más comunes sobre nuestra plataforma"}
            </p>
            {error && (
              <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  ⚠️ Usando datos de ejemplo: {error}
                </p>
              </div>
            )}
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