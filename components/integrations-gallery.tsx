"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

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

// ✅ DATOS DE RESPALDO (los mismos de tu Strapi)
const fallbackData: Hero = {
  titulo1: "Hub de Integraciones",
  PrimerTitulo: "Conecta Todo",
  contenido: "Integra perfectamente con tus herramientas favoritas y proveedores de IA",
  primerTextoAzul: "Popular en Empresas",
  textoBlanco: "200+ Integraciones",
  segundoTextoAzul: "Listas para Usar",
  textoInformativo: "Conecta tu plataforma IA con las herramientas que tu equipo ya usa. Desde plataformas de comunicación hasta suites de productividad, te tenemos cubierto.",
  numeroIntegraciones: "200+",
  integraciones: "Integraciones",
  numeroTiempoActivo: "99.9%",
  tiempoactivo: "Tiempo Activo",
};

export default function IntegrationsGallery() {
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('🔄 Intentando conectar con Strapi...');
        
        // ✅ PRIMERO INTENTA CON STRAPI
        const response = await fetch("http://34.170.207.129:1337/api/sexto-contenedor", { 
          cache: "no-store",
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

  const topIntegrations = [
    {
      id: "whatsapp",
      name: "WhatsApp Business",
      icon: "/images/Logo-WHATSAPP.jpg",
      color: "#25D366",
      description: "Es una aplicación de mensajería instantánea que permite enviar y recibir mensajes, audios, videos y fotografía a través de un teléfono móvil.",
    },
    {
      id: "salesforce",
      name: "salesforce",
      icon: "/images/Logo-SALESFORCE.jpg",
      color: "#0088CC",
      description: "Es una plataforma CRM que permite a las empresas centralizar y automatizar la gestión de clientes en la nube.",
    },
    {
      id: "sap",
      name: "SAP",
      icon: "/images/Logo-SAP.jpg",
      color: "#006BFF",
      description: "Es un software de gestión empresarial basado en ERP que conecta y optimiza diferentes áreas de la organización.",
    },
    {
      id: "oracle",
      name: "ORACLE",
      icon: "/images/Logo-ORACLE.jpg",
      color: "#006BFF",
      description: "Es una compañía especializada en el desarrollo de soluciones de nube y locales.",
    },
    {
      id: "bitrix24",
      name: "Bitrix24",
      icon: "/images/Logo-BITRIX.jpg",
      color: "#FF9D00",
      description: "Es una plataforma integral de gestion empresarial que combina herramientas de marketing, automatizacion y colaboracion online.",
    },
    {
      id: "odoo",
      name: "odoo",
      icon: "/images/Logo-ODOO.jpg",
      color: "#4A154B",
      description: "Es una plataforma de código abierto que ofrece una amplia gama de aplicaciones empresariales integradas, diseñadas para mejorar la productividad y eficiencia de las empresas",
    },
  ];

  const topLLMProviders = [
    {
      id: "gemini",
      name: "Gemini",
      icon: "/images/Logo-GEMINI.jpg",
      color: "#10A37F",
      description: "Es un modelo de inteligencia artificial creado por Google que puede entender y generar textos, imágenes, audio y código",
    },
    {
      id: "deepseek",
      name: "DeepSeek",
      icon: "/images/Logo-DEEPSEEK.jpg",
      color: "#D97706",
      description: "Es una plataforma avanzada de búsqueda y análisis que utiliza inteligencia artificial para ofrecer resultados precisos y sintetizar información compleja.",
    },
    {
      id: "openai",
      name: "OpenAI",
      icon: "/images/Logo-OPENAI.jpg",
      color: "#F97316",
      description: "Modelo de lenguaje avanzados que generan texto de calidad humana y resuelven problemas complejos",
    },
    {
      id: "anthropic",
      name: "ANTHROPIC",
      icon: "/images/Logo-ANTHROPIC.jpg",
      color: "#DC2626",
      description: "Se especializa en el desarrollo de sistemas de información y modelos de lenguaje, con una ética empresarial de uso responsable de la IA.",
    },
    {
      id: "fireworks",
      name: "Fireworks AI",
      icon: "/images/Logo-FIREWORKS.jpg",
      color: "#8B5CF6",
      description: "Modelos de IA de código abierto a velocidad vertiginosa, optimizados para tu caso de uso, escalados globalmente con Fireworks Al Cloud",
    },
  ];

  const IntegrationItem = ({ item, index }: { item: any; index: number }) => (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      
    >
      <div className="flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:bg-white/5 cursor-pointer border border-transparent hover:border-white/10">
        <div className="flex items-center gap-4">
          <motion.div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-xl relative overflow-hidden"
            //color - comentado
            // style={{ backgroundColor: `${item.color}20` }}
            transition={{ duration: 0.2 }}
          >
            {/* 👇 Si es una ruta de imagen, usa <Image />, si no renderiza texto (emoji) */}
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
            className="absolute inset-0 rounded-lg"
            style={{ backgroundColor: item.color }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          </motion.div>
          <div>
            <div className="text-white font-medium text-sm">{item.name}</div>
            <div className="w-72 text-gray-400 text-xs">{item.description}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-sm text-blue-400 mb-4">
              Conectando con Strapi...
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Cargando Integraciones
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Obteniendo la información más reciente desde nuestro servidor
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Patrón de fondo */}
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
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-sm text-blue-400 mb-4">
            {hero?.titulo1}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {hero?.PrimerTitulo}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {hero?.contenido}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Columna Izquierda - Llamada a la Acción */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="text-blue-400 text-sm font-medium mb-2">
                {hero?.primerTextoAzul}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                {hero?.textoBlanco}
                <br />
                <span className="text-blue-400">
                  {hero?.segundoTextoAzul}
                </span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {hero?.textoInformativo}
              </p>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
              <div>
                <div className="text-2xl font-bold text-white">{hero?.numeroIntegraciones}</div>
                <div className="text-xs text-gray-400">{hero?.integraciones}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{hero?.numeroTiempoActivo}</div>
                <div className="text-xs text-gray-400">{hero?.tiempoactivo}</div>
              </div>
            </div>
          </motion.div>

          {/* Columna Central - Principales Integraciones */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <h4 className="text-lg font-semibold text-white">
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

                <div className="mt-6 pt-4 border-t border-white/10">
                  {/* <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors duration-300 flex items-center gap-2">
                    <span>Ver todas las integraciones</span>
                    <ArrowRight className="h-3 w-3" />
                  </button> */}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Columna Derecha - Principales Proveedores LLM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  </div>
                  <h4 className="text-lg font-semibold text-white">
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

                <div className="mt-6 pt-4 border-t border-white/10">
                  {/* <button className="text-purple-400 text-sm hover:text-purple-300 transition-colors duration-300 flex items-center gap-2">
                    <span>Ver todos los proveedores</span>
                    <ArrowRight className="h-3 w-3" />
                  </button> */}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sección inferior con información adicional */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 text-sm text-gray-400">
            <span>¿Necesitas una integración personalizada?</span>
            <a
              href="#contact"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
            >
              Contacta a nuestro equipo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}