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
        console.log("🔄 Conectando con Strapi...");
        const res = await fetch("http://strapi.inteligenze.com/api/septimo-contenedor", {
          cache: "no-store",
        });

        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

        const json = await res.json();
        if (json?.data) {
          setHero(json.data);
        } else {
          throw new Error("Estructura de datos no válida");
        }
      } catch (err) {
        console.error("❌ Error obteniendo datos de Strapi:", err);
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
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
            <HelpCircle className="h-4 w-4" />
            Conectando con Strapi...
          </div>
          <h2 className="text-3xl font-bold">Cargando Preguntas Frecuentes...</h2>
        </div>
      </section>
    );
  }

  if (!hero) {
    return (
      <section className="py-20 text-center">
        <p className="text-muted-foreground">
          No se pudieron cargar las preguntas. Inténtalo más tarde.
        </p>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-muted/10">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
            <HelpCircle className="h-4 w-4" />
            {hero.FAQ}
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            {hero.PrimerTitulo}
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl mt-2">
            {hero.contenido}
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="overflow-hidden bg-background/60 backdrop-blur-sm border transition-all duration-300 hover:shadow-lg">
                <motion.button
                  className="w-full text-left"
                  onClick={() => toggleItem(index)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold pr-4">
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{
                          rotate: openItems.includes(index) ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
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
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="px-6 pb-6 pt-0 border-t">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
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
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-sm text-muted-foreground">
            ¿Aún tienes preguntas?{" "}
            <a
              href="#contact"
              className="text-primary hover:underline font-medium"
            >
              Contacta a nuestro equipo de soporte
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
