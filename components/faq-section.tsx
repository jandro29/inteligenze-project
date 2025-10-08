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

const fallbackData: Hero = {
  FAQ: "FAQ",
  PrimerTitulo: "Preguntas Frecuentes",
  contenido:
    "Obtén respuestas a preguntas comunes sobre nuestra plataforma IA empresarial, implementación y soporte.",
  pregunta1: "¿Qué tan segura es su plataforma IA para uso empresarial?",
  respuesta1:
    "Nuestra tecnología utiliza inteligencia artificial para completar cuestionarios ESG en segundos, extrayendo la información relevante de documentos como informes anuales, estados financieros o reportes de sostenibilidad (CSR).",
  pregunta2: "¿Cómo automatiza Inteligenze los cuestionarios ESG?",
  respuesta2:
    "En Inteligenze creemos en la innovación continua. Por eso estamos desarrollando herramientas de IA especializadas para una amplia gama de casos de uso ESG, desde la gestión de datos hasta el análisis predictivo.",
  pregunta3: "¿Qué más puede hacer Inteligenze?",
  respuesta3:
    "Inteligenze puede analizar datos cuantitativos y cualitativos relacionados con medio ambiente, gobernanza y responsabilidad social...",
  pregunta4: "¿Qué tipo de datos ESG puede analizar Inteligenze?",
  respuesta4:
    "Sí. Gracias a nuestra API flexible y segura, Inteligenze puede integrarse fácilmente con sistemas internos...",
  pregunta5: "¿Inteligenze puede integrarse con otras plataformas o sistemas internos?",
  respuesta5:
    "Sí. Inteligenze se adapta tanto a grandes corporaciones como a pymes en distintas etapas de madurez ESG...",
  pregunta6: "¿Inteligenze es adecuada para cualquier tipo de empresa?",
  respuesta6:
    "Ofrecemos precios flexibles basados en uso, número de usuarios y requisitos de características...",
  pregunta7: "¿Cómo aseguran la privacidad de datos y cumplimiento?",
  respuesta7:
    "Mantenemos estándares estrictos de privacidad de datos con cumplimiento GDPR, HIPAA y SOC 2...",
  pregunta8: "¿Qué pasa con nuestros datos si decidimos discontinuar el servicio?",
  respuesta8:
    "Proporcionamos herramientas integrales de exportación de datos y asistencia de migración de soporte...",
};

export default function FAQSection() {
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        console.log("🛰️ Obteniendo datos desde Strapi...");

        const res = await fetch("https://strapi.inteligenze.com/api/septimo-contenedor", {
          cache: "no-store",
          signal: AbortSignal.timeout(8000),
        });

        if (!res.ok) throw new Error(`HTTP error ${res.status}`);

        const json = await res.json();

        if (json.data) {
          setHero(json.data);
        } else {
          throw new Error("Respuesta sin datos válidos");
        }
      } catch (err) {
        console.error("❌ Error al conectar con Strapi:", err);
        setError(true);
        setHero(fallbackData);
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

  if (loading) {
    return (
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold">Cargando Preguntas...</h2>
        <p className="text-muted-foreground">Conectando con Strapi...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold text-red-500">
          No se pudieron cargar las preguntas.
        </h2>
        <p className="text-muted-foreground">
          Inténtalo más tarde o revisa la conexión con Strapi.
        </p>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
              <HelpCircle className="h-4 w-4" />
              {hero?.FAQ || "Preguntas Frecuentes"}
            </div>
            <h2 className="text-3xl font-bold">
              {hero?.PrimerTitulo || "Preguntas Frecuentes"}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {hero?.contenido ||
                "Encuentra respuestas a las preguntas más comunes"}
            </p>
          </div>
        </motion.div>

        {faqs.map((faq, index) => (
          <Card key={index} className="mb-4">
            <CardContent>
              <button
                className="flex justify-between items-center w-full"
                onClick={() => toggleItem(index)}
              >
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <ChevronDown
                  className={`transition-transform ${
                    openItems.includes(index) ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2"
                  >
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
