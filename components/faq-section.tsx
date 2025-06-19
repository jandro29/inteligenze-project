"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([0]) // Primer elemento abierto por defecto

  const faqs = [
    {
      question: "¿Qué tan segura es su plataforma IA para uso empresarial?",
      answer:
        "Nuestra plataforma emplea cifrado de nivel bancario, cumplimiento SOC 2 Tipo II y sigue protocolos estrictos de gobernanza de datos. Todos los datos están cifrados en tránsito y en reposo, con controles de acceso basados en roles y registros de auditoría integrales. Soportamos implementación local y opciones de nube privada para máximo control de seguridad.",
    },
    {
      question: "¿Qué tipos de integraciones soportan?",
      answer:
        "Soportamos más de 200+ integraciones incluyendo sistemas ERP principales (SAP, Oracle), plataformas CRM (Salesforce, HubSpot), herramientas de colaboración (Microsoft 365, Slack) y APIs personalizadas. Nuestro marco de integración soporta APIs REST, webhooks y sincronización de datos en tiempo real con la mayoría de sistemas empresariales.",
    },
    {
      question: "¿Qué tan rápido podemos implementar su solución IA?",
      answer:
        "La implementación típicamente toma 2-4 semanas para despliegues estándar. Esto incluye configuración inicial, integración de datos, entrenamiento de usuarios y soporte de puesta en marcha. Para entornos empresariales complejos, proporcionamos especialistas de implementación dedicados y podemos acomodar cronogramas personalizados basados en tus requisitos específicos.",
    },
    {
      question: "¿Qué tipo de soporte y entrenamiento proporcionan?",
      answer:
        "Ofrecemos soporte técnico integral 24/7, gerentes de éxito del cliente dedicados para clientes empresariales, documentación extensa, tutoriales en video y sesiones de entrenamiento en vivo. Nuestro soporte incluye asistencia de incorporación, orientación de mejores prácticas y recomendaciones de optimización continua.",
    },
    {
      question: "¿Puede la IA ser personalizada para las necesidades específicas de nuestra industria?",
      answer:
        "Absolutamente. Nuestra plataforma soporta agentes IA personalizados, plantillas de prompts específicas de la industria y bases de conocimiento especializadas. Trabajamos con clientes para desarrollar soluciones personalizadas para salud, finanzas, legal, gobierno y otras industrias reguladas con requisitos de cumplimiento específicos.",
    },
    {
      question: "¿Cuáles son sus modelos de precios y términos de contrato?",
      answer:
        "Ofrecemos precios flexibles basados en uso, número de usuarios y requisitos de características. Las opciones incluyen suscripciones mensuales, contratos anuales con descuentos y licenciamiento empresarial. Todos los planes incluyen características principales, con niveles premium ofreciendo análisis avanzados, soporte prioritario e integraciones personalizadas.",
    },
    {
      question: "¿Cómo aseguran la privacidad de datos y cumplimiento?",
      answer:
        "Mantenemos estándares estrictos de privacidad de datos con cumplimiento GDPR, HIPAA y SOC 2. Las opciones de residencia de datos están disponibles, y nunca usamos datos de clientes para entrenar nuestros modelos. Nuestra plataforma incluye anonimización de datos, controles de retención y el derecho a eliminación para cumplir requisitos regulatorios.",
    },
    {
      question: "¿Qué pasa con nuestros datos si decidimos discontinuar el servicio?",
      answer:
        "Proporcionamos herramientas integrales de exportación de datos y asistencia de migración de soporte. Mantienes propiedad completa de tus datos, y garantizamos eliminación segura de datos dentro de 30 días de terminación del contrato. También ofrecemos períodos extendidos de retención de datos si es necesario para propósitos de cumplimiento.",
    },
  ]

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

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
              FAQ
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Preguntas Frecuentes</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Obtén respuestas a preguntas comunes sobre nuestra plataforma IA empresarial, implementación y soporte.
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
                      <h3 className="text-lg font-semibold pr-4 leading-relaxed">{faq.question}</h3>
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
                          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </motion.div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Efecto sutil de hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 pointer-events-none"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Sección de contacto de soporte */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span>¿Aún tienes preguntas?</span>
            <a href="#contact" className="text-primary hover:underline font-medium transition-colors duration-200">
              Contacta a nuestro equipo de soporte
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
