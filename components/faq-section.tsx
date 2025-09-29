"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Hero {
  FAQ: string;
  PrimerTitulo:string;
  contenido:string;
  pregunta1:string;
  respuesta1:string;
  pregunta2:string;
  respuesta2:string;
  pregunta3:string;
  respuesta3:string;
  pregunta4:string;
  respuesta4:string;
  pregunta5:string;
  respuesta5:string;
  pregunta6:string;
  respuesta6:string;
  pregunta7:string;
  respuesta7:string;
  pregunta8:string;
  respuesta8:string;
}


export const dynamic = 'force-dynamic'

export const revalidate = 0


export default function FAQSection() {


  const [hero, setHero] = useState<Hero | null>(null);
  
    useEffect(() => {
      fetch("https://34.170.207.129:1337/api/septimo-contenedor", { cache: "no-store" })
        .then((res) => res.json())
        .then((json) => {
          console.log(" JSON recibido:", json);
          setHero(json.data);
        })
        .catch((err) => console.error(err));
    }, []);


  const [openItems, setOpenItems] = useState<number[]>([0]); // Primer elemento abierto por defecto

  const faqs = [
    {
      question: hero?.pregunta1 ?? "Cargando...",
      answer: hero?.respuesta1 ?? "Cargando...",
    },
    {
     question: hero?.pregunta2 ?? "Cargando...",
      answer: hero?.respuesta2 ?? "Cargando...",    
    },
    {
      question: hero?.pregunta3 ?? "Cargando...",
      answer: hero?.respuesta3 ?? "Cargando...",    
    },
    {
     question: hero?.pregunta4 ?? "Cargando...",
      answer: hero?.respuesta4 ?? "Cargando...",    
    },
    {
      question: hero?.pregunta5 ?? "Cargando...",
      answer: hero?.respuesta5 ?? "Cargando...",    
    },
    {
      question: hero?.pregunta6 ?? "Cargando...",
      answer: hero?.respuesta6 ?? "Cargando...",    
    },
    {
      question: hero?.pregunta7 ?? "Cargando...",
      answer: hero?.respuesta7 ?? "Cargando...",    
    },
    {
      question: hero?.pregunta8 ?? "Cargando...",
      answer: hero?.respuesta8 ?? "Cargando...",    
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
              {hero?.FAQ ?? "Esperando subtítulo..."}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {hero?.PrimerTitulo ?? "Esperando subtítulo..."}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {hero?.contenido ?? "Esperando subtítulo..."}
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
