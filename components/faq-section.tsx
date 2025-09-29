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
        console.log('🔄 Conectando con Strapi via HTTPS...');
        
        // ✅ AHORA CON HTTPS - usa el puerto 443
        const response = await fetch("http://34.170.207.129/api/septimo-contenedor", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          cache: "no-store"
        });

        console.log('📡 Response status:', response.status);
        console.log('📡 Response ok:', response.ok);

        if (!response.ok) {
          throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
        }

        const json = await response.json();
        console.log("✅ Datos recibidos de Strapi:", json);
        
        if (json.data && json.data.attributes) {
          setHero(json.data.attributes);
        } else if (json.data) {
          setHero(json.data);
        } else {
          console.log("❌ Estructura inesperada:", json);
        }
      } catch (err) {
        console.error("❌ Error fetching desde Strapi:", err);
        
        // Intento alternativo con HTTP en caso de que HTTPS falle
        try {
          console.log('🔄 Intentando con HTTP como fallback...');
          const fallbackResponse = await fetch("http://34.170.207.129:1337/api/septimo-contenedor", {
            cache: "no-store"
          });
          
          if (fallbackResponse.ok) {
            const fallbackJson = await fallbackResponse.json();
            console.log("✅ Datos recibidos via HTTP fallback:", fallbackJson);
            if (fallbackJson.data) {
              setHero(fallbackJson.data);
            }
          }
        } catch (fallbackError) {
          console.error("❌ Fallback también falló:", fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [openItems, setOpenItems] = useState<number[]>([0]);

  // Datos de fallback solo si no hay datos de Strapi
  const faqs = hero ? [
    { 
      question: hero.pregunta1 || "¿Qué es Inteligence?", 
      answer: hero.respuesta1 || "Plataforma de IA empresarial para transformar tu organización." 
    },
    { 
      question: hero.pregunta2 || "¿Cómo funciona la integración?", 
      answer: hero.respuesta2 || "Ofrecemos APIs flexibles y conectores preconstruidos." 
    },
    { 
      question: hero.pregunta3 || "¿Qué seguridad ofrece?", 
      answer: hero.respuesta3 || "Cifrado de nivel bancario y cumplimiento SOC 2." 
    },
    { 
      question: hero.pregunta4 || "¿Es escalable?", 
      answer: hero.respuesta4 || "Sí, crece con tu organización sin interrupciones." 
    },
    { 
      question: hero.pregunta5 || "¿Qué soporte incluye?", 
      answer: hero.respuesta5 || "Soporte técnico 24/7 y capacitación personalizada." 
    },
    { 
      question: hero.pregunta6 || "¿Hay prueba gratuita?", 
      answer: hero.respuesta6 || "Sí, prueba de 14 días con todas las funciones." 
    },
    { 
      question: hero.pregunta7 || "¿Cómo se factura?", 
      answer: hero.respuesta7 || "Planes flexibles según uso mensual o anual." 
    },
    { 
      question: hero.pregunta8 || "¿Puedo migrar mis datos?", 
      answer: hero.respuesta8 || "Sí, nuestro equipo ayuda en la migración completa." 
    },
  ] : [];

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
                Cargando contenido dinámico
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Los datos se cargarán automáticamente desde tu panel de Strapi
              </p>
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
          </div>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {faqs.length > 0 ? (
            faqs.map((faq, index) => (
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
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No se pudieron cargar las preguntas frecuentes.</p>
            </div>
          )}
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