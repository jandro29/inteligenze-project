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
        console.log('🔄 Intentando conectar con Strapi...');
        
        // Datos de ejemplo como fallback inmediato
        const datosEjemplo: Hero = {
          FAQ: "Preguntas Frecuentes",
          PrimerTitulo: "¿Tienes preguntas? Tenemos respuestas",
          contenido: "Encuentra soluciones a las consultas más comunes sobre nuestra plataforma de IA",
          pregunta1: "¿Qué es Inteligence y cómo puede ayudar a mi empresa?",
          respuesta1: "Inteligence es una plataforma de IA empresarial que transforma cómo las organizaciones manejan el conocimiento, automatizan procesos y mejoran la experiencia del cliente mediante agentes de IA personalizables.",
          pregunta2: "¿Cómo se integra con nuestros sistemas existentes?",
          respuesta2: "Ofrecemos APIs RESTful, SDKs para múltiples lenguajes, y conectores preconstruidos para sistemas populares como Salesforce, Slack, Microsoft Teams, y bases de datos SQL/NoSQL.",
          pregunta3: "¿Qué nivel de personalización ofrecen?",
          respuesta3: "Personalización completa: desde la creación de agentes de IA específicos para cada departamento, hasta la integración con tus flujos de trabajo existentes y branding corporativo.",
          pregunta4: "¿Cómo garantizan la seguridad de nuestros datos?",
          respuesta4: "Implementamos encriptación end-to-end, cumplimiento con GDPR/HIPAA, aislamiento de datos por cliente, y auditorías de seguridad regulares. Todos los datos se procesan en infraestructura certificada SOC2.",
          pregunta5: "¿Qué tipo de soporte y capacitación incluye?",
          respuesta5: "Soporte técnico 24/7, documentación completa, sesiones de capacitación personalizadas, y un equipo de éxito del cliente dedicado para garantizar una implementación exitosa.",
          pregunta6: "¿Es escalable para empresas de diferentes tamaños?",
          respuesta6: "Sí, nuestra arquitectura escala desde startups hasta Fortune 500. Ofrecemos planes flexibles que crecen con tu organización sin interrupciones del servicio.",
          pregunta7: "¿Qué diferencia a Inteligence de otras plataformas de IA?",
          respuesta7: "Combinamos capacidades avanzadas de LLM con herramientas de gestión de conocimiento empresarial, integración profunda con sistemas existentes, y un enfoque en ROI medible desde el primer día.",
          pregunta8: "¿Cómo podemos empezar y qué incluye la prueba?",
          respuesta8: "Inicia con una consultoría gratuita, seguida de una prueba de 14 días con acceso completo a todas las features, implementación asistida y reportes personalizados de métricas de impacto."
        };

        // Intenta conectar con Strapi pero usa datos de ejemplo si falla
        try {
          const response = await fetch("http://34.170.207.129:1337/api/septimo-contenedor", {
            mode: 'no-cors',
            cache: "no-cache",
          });
          console.log('📡 Strapi response type:', response.type);
        } catch (error) {
          console.log('⚠️ Strapi no disponible, usando datos de ejemplo');
        }

        // Usar datos de ejemplo inmediatamente
        setHero(datosEjemplo);
        
      } catch (err) {
        console.error("❌ Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [openItems, setOpenItems] = useState<number[]>([0]);

  const faqs = hero ? [
    { question: hero.pregunta1, answer: hero.respuesta1 },
    { question: hero.pregunta2, answer: hero.respuesta2 },
    { question: hero.pregunta3, answer: hero.respuesta3 },
    { question: hero.pregunta4, answer: hero.respuesta4 },
    { question: hero.pregunta5, answer: hero.respuesta5 },
    { question: hero.pregunta6, answer: hero.respuesta6 },
    { question: hero.pregunta7, answer: hero.respuesta7 },
    { question: hero.pregunta8, answer: hero.respuesta8 },
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
              {hero?.contenido || "Encuentra respuestas a las preguntas más comunes"}
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