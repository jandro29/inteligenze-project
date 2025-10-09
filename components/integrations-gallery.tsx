"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Hero {
  titulo1: string;
  PrimerTitulo: string;
  contenido: string;
  primerTextoAzul: string;
  textoBlanco: string;
  segundoTextoAzul: string;
  textoInformativo: string;
  numeroIntegraciones: string;
  integraciones: string;
  numeroTiempoActivo: string;
  tiempoactivo: string;
}

const fallbackData: Hero = {
  titulo1: "Hub de Integraciones",
  PrimerTitulo: "Conecta Todo",
  contenido:
    "Integra perfectamente con tus herramientas favoritas y proveedores de IA",
  primerTextoAzul: "Popular en Empresas",
  textoBlanco: "200+ Integraciones",
  segundoTextoAzul: "Listas para Usar",
  textoInformativo:
    "Conecta tu plataforma IA con las herramientas que tu equipo ya usa. Desde plataformas de comunicación hasta suites de productividad, te tenemos cubierto.",
  numeroIntegraciones: "200+",
  integraciones: "Integraciones",
  numeroTiempoActivo: "99.9%",
  tiempoactivo: "Tiempo Activo",
};

export default function IntegrationsGallery() {
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://34.170.207.129:1337/api/sexto-contenedor",
          { cache: "no-store" }
        );

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const json = await response.json();
        if (json.data) setHero(json.data);
        else throw new Error("Estructura inválida");
      } catch {
        setHero(fallbackData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const topIntegrations = [
    {
      id: "whatsapp",
      name: "WhatsApp Business",
      icon: "/images/Logo-WHATSAPP.jpg",
      color: "#25D366",
      description:
        "Aplicación de mensajería que permite enviar mensajes, audios, videos y fotos a través del móvil.",
    },
    {
      id: "salesforce",
      name: "Salesforce",
      icon: "/images/Logo-SALESFORCE.jpg",
      color: "#0088CC",
      description:
        "Plataforma CRM que centraliza y automatiza la gestión de clientes en la nube.",
    },
    {
      id: "sap",
      name: "SAP",
      icon: "/images/Logo-SAP.jpg",
      color: "#006BFF",
      description:
        "Software ERP que conecta y optimiza diferentes áreas de la organización.",
    },
    {
      id: "oracle",
      name: "Oracle",
      icon: "/images/Logo-ORACLE.jpg",
      color: "#F80000",
      description:
        "Compañía especializada en el desarrollo de soluciones en la nube y locales.",
    },
    {
      id: "bitrix24",
      name: "Bitrix24",
      icon: "/images/Logo-BITRIX.jpg",
      color: "#FF9D00",
      description:
        "Plataforma integral de gestión empresarial con marketing, automatización y colaboración.",
    },
    {
      id: "odoo",
      name: "Odoo",
      icon: "/images/Logo-ODOO.jpg",
      color: "#4A154B",
      description:
        "Plataforma de código abierto con múltiples aplicaciones empresariales integradas.",
    },
  ];

  const topLLMProviders = [
    {
      id: "gemini",
      name: "Gemini",
      icon: "/images/Logo-GEMINI.jpg",
      color: "#10A37F",
      description:
        "Modelo de IA creado por Google que entiende y genera texto, imágenes y código.",
    },
    {
      id: "deepseek",
      name: "DeepSeek",
      icon: "/images/Logo-DEEPSEEK.jpg",
      color: "#D97706",
      description:
        "Plataforma de búsqueda y análisis basada en IA para información compleja.",
    },
    {
      id: "openai",
      name: "OpenAI",
      icon: "/images/Logo-OPENAI.jpg",
      color: "#F97316",
      description:
        "Modelos de lenguaje avanzados que generan texto de calidad humana.",
    },
    {
      id: "anthropic",
      name: "Anthropic",
      icon: "/images/Logo-ANTHROPIC.jpg",
      color: "#DC2626",
      description:
        "Empresa especializada en IA responsable y desarrollo de modelos de lenguaje.",
    },
    {
      id: "fireworks",
      name: "Fireworks AI",
      icon: "/images/Logo-FIREWORKS.jpg",
      color: "#8B5CF6",
      description:
        "Modelos de IA de código abierto optimizados para casos de uso globales.",
    },
  ];

  const IntegrationItem = ({ item, index }: { item: any; index: number }) => (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:bg-accent cursor-pointer border border-transparent hover:border-border">
        <div className="flex items-center gap-4">
          <motion.div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-xl relative overflow-hidden"
            transition={{ duration: 0.2 }}
          >
            {typeof item.icon === "string" && item.icon.startsWith("/") ? (
              <Image
                src={item.icon}
                alt={item.name}
                fill
                className="object-contain z-10"
              />
            ) : (
              <span className="relative z-10">{item.icon}</span>
            )}
            <motion.div
              className="absolute inset-0 rounded-lg opacity-10"
              style={{ backgroundColor: item.color }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
          <div>
            <div className="text-foreground font-medium text-sm">
              {item.name}
            </div>
            <div className="w-72 text-muted-foreground text-xs">
              {item.description}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <section className="py-20 bg-background relative overflow-hidden transition-colors">
        <div className="container px-4 md:px-6 relative z-10 text-center">
          <div className="inline-block rounded-lg bg-primary/10 border border-primary/20 px-3 py-1 text-sm text-primary mb-4">
            Conectando con Strapi...
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Cargando Integraciones
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Obteniendo la información más reciente desde nuestro servidor
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background relative overflow-hidden transition-colors duration-500">
      {/* Fondo con gradiente decorativo */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #3B82F6 0%, transparent 50%), 
                               radial-gradient(circle at 75% 75%, #8B5CF6 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block rounded-lg bg-primary/10 border border-primary/20 px-3 py-1 text-sm text-primary mb-4">
            {hero?.titulo1}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {hero?.PrimerTitulo}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {hero?.contenido}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Columna izquierda */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="text-primary text-sm font-medium mb-2">
                {hero?.primerTextoAzul}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                {hero?.textoBlanco}
                <br />
                <span className="text-primary">{hero?.segundoTextoAzul}</span>
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {hero?.textoInformativo}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {hero?.numeroIntegraciones}
                </div>
                <div className="text-xs text-muted-foreground">
                  {hero?.integraciones}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {hero?.numeroTiempoActivo}
                </div>
                <div className="text-xs text-muted-foreground">
                  {hero?.tiempoactivo}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Columna central */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-card border border-border shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">
                    Principales Integraciones
                  </h4>
                </div>

                <div className="space-y-1">
                  {topIntegrations.map((integration, index) => (
                    <IntegrationItem
                      key={integration.id}
                      item={integration}
                      index={index}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Columna derecha */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-card border border-border shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">
                    Principales Proveedores LLM
                  </h4>
                </div>

                <div className="space-y-1">
                  {topLLMProviders.map((provider, index) => (
                    <IntegrationItem
                      key={provider.id}
                      item={provider}
                      index={index}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Pie con CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span>¿Necesitas una integración personalizada?</span>
            <a
              href="#contact"
              className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
            >
              Contacta a nuestro equipo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
