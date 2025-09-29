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

// ✅ DATOS DE RESPALDO (los mismos de tu Strapi)
const fallbackData: Hero = {
  FAQ: "FAQ",
  PrimerTitulo: "Preguntas Frecuentes",
  contenido: "Obtén respuestas a preguntas comunes sobre nuestra plataforma IA empresarial, implementación y soporte.",
  pregunta1: "¿Qué tan segura es su plataforma IA para uso empresarial?",
  respuesta1: "Nuestra plataforma emplea cifrado de nivel bancario, cumplimiento SOC 2 Tipo II y sigue protocolos estrictos de gobernanza de datos. Todos los datos están cifrados en tránsito y en reposo, con controles de acceso basados en roles y registros de auditoría integrales. Soportamos implementación local y opciones de nube privada para máximo control de seguridad",
  pregunta2: "¿Qué tipos de integraciones soportan?",
  respuesta2: "Soportamos más de 200+ integraciones incluyendo sistemas ERP principales (SAP, Oracle), plataformas CRM (Salesforce, HubSpot), herramientas de colaboración (Microsoft 365, Slack) y APIs personalizadas. Nuestro marco de integración soporta APIs REST, webhooks y sincronización de datos en tiempo real con la mayoría de sistemas empresariales.",
  pregunta3: "¿Qué tan rápido podemos implementar su solución IA?",
  respuesta3: "La implementación típicamente toma 2-4 semanas para despliegues estándar. Esto incluye configuración inicial, integración de datos, entrenamiento de usuarios y soporte de puesta en marcha. Para entornos empresariales complejos, proporcionamos especialistas de implementación dedicados y podemos acomodar cronogramas personalizados basados en tus requisitos específicos.",
  pregunta4: "¿Qué tipo de soporte y entrenamiento proporcionan?",
  respuesta4: "Ofrecemos soporte técnico integral 24/7, gerentes de éxito del cliente dedicados para clientes empresariales, documentación extensa, tutoriales en video y sesiones de entrenamiento en vivo. Nuestro soporte incluye asistencia de incorporación, orientación de mejores prácticas y recomendaciones de optimización continua.",
  pregunta5: "¿Puede la IA ser personalizada para las necesidades específicas de nuestra industria?",
  respuesta5: "Absolutamente. Nuestra plataforma soporta agentes IA personalizados, plantillas de prompts específicas de la industria y bases de conocimiento especializadas. Trabajamos con clientes para desarrollar soluciones personalizadas para salud, finanzas, legal, gobierno y otras industrias reguladas con requisitos de cumplimiento específicos.",
  pregunta6: "¿Cuáles son sus modelos de precios y términos de contrato?",
  respuesta6: "Ofrecemos precios flexibles basados en uso, número de usuarios y requisitos de características. Las opciones incluyen suscripciones mensuales, contratos anuales con descuentos y licenciamiento empresarial. Todos los planes incluyen características principales, con niveles premium ofreciendo análisis avanzados, soporte prioritario e integraciones personalizadas.",
  pregunta7: "¿Cómo aseguran la privacidad de datos y cumplimiento?",
  respuesta7: "Mantenemos estándares estrictos de privacidad de datos con cumplimiento GDPR, HIPAA y SOC 2. Las opciones de residencia de datos están disponibles, y nunca usamos datos de clientes para entrenar nuestros modelos. Nuestra plataforma incluye anonimización de datos, controles de retención y el derecho a eliminación para cumplir requisitos regulatorios.",
  pregunta8: "¿Qué pasa con nuestros datos si decidimos discontinuar el servicio?",
  respuesta8: "Proporcionamos herramientas integrales de exportación de datos y asistencia de migración de soporte. Mantienes propiedad completa de tus datos, y garantizamos eliminación segura de datos dentro de 30 días de terminación del contrato. También ofrecemos períodos extendidos de retención de datos si es necesario para propósitos de cumplimiento.",
};

export default function FAQSection() {
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('🔄 Intentando conectar con Strapi...');
        
        // ✅ PRIMERO INTENTA CON STRAPI
        const response = await fetch("http://34.170.207.129:1337/api/septimo-contenedor", { 
          cache: "no-store",
          // Timeout de 8 segundos
          signal: AbortSignal.timeout(8000)
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const json = await response.json();
        console.log("✅ Datos obtenidos de Strapi:", json);
        
        if (json.data) {
          setHero(json.data);
          setUsingFallback(false);
        } else {
          throw new Error("Estructura de datos inválida");
        }
        
      } catch (error) {
        console.error("❌ Error con Strapi, usando datos de respaldo:", error);
        // ✅ SI FALLA STRAPI, USA LOS DATOS ESTÁTICOS
        setHero(fallbackData);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [openItems, setOpenItems] = useState<number[]>([0]);

  const faqs = hero ? [
    {
      question: hero.pregunta1,
      answer: hero.respuesta1,
    },
    {
      question: hero.pregunta2,
      answer: hero.respuesta2,    
    },
    {
      question: hero.pregunta3,
      answer: hero.respuesta3,    
    },
    {
      question: hero.pregunta4,
      answer: hero.respuesta4,    
    },
    {
      question: hero.pregunta5,
      answer: hero.respuesta5,    
    },
    {
      question: hero.pregunta6,
      answer: hero.respuesta6,    
    },
    {
      question: hero.pregunta7,
      answer: hero.respuesta7,    
    },
    {
      question: hero.pregunta8,
      answer: hero.respuesta8,    
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

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-muted/10">
      <div className="container px-4 md:px-6">
        {/* Indicador de origen de datos */}
        {usingFallback && (
          <div className="mb-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-3 py-1 text-sm text-white">
              <span>⚠️ Modo offline - Mostrando datos locales</span>
            </div>
          </div>
        )}

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