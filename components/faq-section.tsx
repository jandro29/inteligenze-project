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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("🔄 Conectando a Strapi...");

        const response = await fetch("http://34.170.207.129:1337/api/septimo-contenedor", {
          cache: "no-store",
          signal: AbortSignal.timeout(8000),
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const json = await response.json();
        console.log("✅ Datos obtenidos de Strapi:", json);

        if (json.data) {
          setHero(json.data);
        } else {
          throw new Error("❌ La API no devolvió datos válidos");
        }
      } catch (error) {
        console.error("❌ Error al obtener datos de Strapi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [openItems, setOpenItems] = useState<number[]>([0]);

  const faqs = hero
    ? [
        { question: hero.pregunta1, answer: hero.respuesta1 },
        { question: hero.pregunta2, answer: hero.respuesta2 },
        { question: hero.pregunta3, answer: hero.respuesta3 },
        { question: hero.pregunta4, answer: hero.respuesta4 },
        { question: hero.pregunta5, answer: hero.respuesta5 },
        { question: hero.pregunta6, answer: hero.respuesta6 },
        { question: hero.pregunta7, answer: hero.respuesta7 },
        { question: hero.pregunta8, answer: hero.respuesta8 },
      ]
    : [];

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // 🔄 Mientras carga
  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-muted/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
                <HelpCircle className="h-4 w-4" />
                Conectando con Strapi...
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Cargando Preguntas Frecuentes
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

  // ❌ Si falla Strapi
  if (!hero) {
    return (
      <section className="py-20 text-center">
        <h2 className="text-xl font-bold text-red-500">
          ❌ No se pudo cargar la información desde Strapi
        </h2>
        <p className="text-muted-foreground mt-4">
          Por favor, verifica tu conexión o intenta nuevamente más tarde.
        </p>
      </section>
    );
  }

  // ✅ Si hay datos de Strapi
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
              {hero.FAQ}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {hero.PrimerTitulo}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {hero.contenido}
            </p>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
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
                        animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
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
        </div>
      </div>
    </section>
  );
}
