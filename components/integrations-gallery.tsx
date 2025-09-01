"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"
import { useEffect, useState } from "react"

interface Hero{
  titulo: string;
  subtitulo: string;
  primerotituloblanco: string;
  segundotituloceleste: string;
  contenido: string;
}


export default function IntegrationsGallery() {
  

  const [hero, setHero] = useState<Hero | null>(null);
  
    useEffect(() => {
      fetch("http://35.238.156.185:1337/api/sevensection", { cache: "no-store" })
        .then((res) => res.json())
        .then((json) => {
          console.log(" JSON recibido:", json);
          setHero(json.data);
        })
        .catch((err) => console.error(err));
    }, []);
    
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const topIntegrations = [
    {
      id: "whatsapp",
      name: "WhatsApp Business",
      icon: "💬",
      color: "#25D366",
      description: "Plataforma de mensajería",
    },
    {
      id: "telegram",
      name: "Telegram",
      icon: "✈️",
      color: "#0088CC",
      description: "Mensajería segura",
    },
    {
      id: "make",
      name: "Make.com",
      icon: "🔧",
      color: "#6366F1",
      description: "Plataforma de automatización",
    },
    {
      id: "calendly",
      name: "Calendly",
      icon: "📅",
      color: "#006BFF",
      description: "Herramienta de programación",
    },
    {
      id: "huggingface",
      name: "Hugging Face",
      icon: "🤗",
      color: "#FF9D00",
      description: "Hub de modelos ML",
    },
    {
      id: "slack",
      name: "Slack",
      icon: "💬",
      color: "#4A154B",
      description: "Colaboración en equipo",
    },
  ]

  const topLLMProviders = [
    {
      id: "openai",
      name: "OpenAI",
      icon: "🤖",
      color: "#10A37F",
      description: "Modelos GPT",
    },
    {
      id: "anthropic",
      name: "Anthropic",
      icon: "🧠",
      color: "#D97706",
      description: "Modelos Claude",
    },
    {
      id: "groq",
      name: "Groq",
      icon: "⚡",
      color: "#F97316",
      description: "Inferencia rápida",
    },
    {
      id: "cerebras",
      name: "Cerebras",
      icon: "🔥",
      color: "#DC2626",
      description: "Alto rendimiento",
    },
    {
      id: "fireworks",
      name: "Fireworks AI",
      icon: "🎆",
      color: "#8B5CF6",
      description: "Modelos optimizados",
    },
  ]

  const IntegrationItem = ({ item, index }: { item: any; index: number }) => (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setHoveredItem(item.id)}
      onHoverEnd={() => setHoveredItem(null)}
    >
      <div className="flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:bg-white/5 cursor-pointer border border-transparent hover:border-white/10">
        <div className="flex items-center gap-4">
          <motion.div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-xl relative overflow-hidden"
            style={{ backgroundColor: `${item.color}20` }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <span className="relative z-10">{item.icon}</span>
            <motion.div
              className="absolute inset-0 rounded-lg"
              style={{ backgroundColor: item.color }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.1 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
          <div>
            <div className="text-white font-medium text-sm">{item.name}</div>
            <div className="text-gray-400 text-xs">{item.description}</div>
          </div>
        </div>
        <motion.div animate={{ x: hoveredItem === item.id ? 4 : 0 }} transition={{ duration: 0.2 }}>
          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
        </motion.div>
      </div>
    </motion.div>
  )

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
            Hub de Integraciones
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{hero?.titulo ?? "Cargando..."}</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {hero?.subtitulo ?? "Cargando..."}
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
              <div className="text-blue-400 text-sm font-medium mb-2">Popular en Empresas</div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                {hero?.primerotituloblanco ?? "Cargando..."}
                <br />
                <span className="text-blue-400">{hero?.segundotituloceleste ?? "Cargando..."}</span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {hero?.contenido ?? "Cargando..."}
              </p>
            </div>

            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 group shadow-lg shadow-blue-600/25"
              size="lg"
            >
              <span>Ir al Hub</span>
              <motion.div className="ml-2" animate={{ x: 0 }} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <ExternalLink className="h-4 w-4" />
              </motion.div>
            </Button>

            {/* Estadísticas */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
              <div>
                <div className="text-2xl font-bold text-white">200+</div>
                <div className="text-xs text-gray-400">Integraciones</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-xs text-gray-400">Tiempo Activo</div>
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
                  <h4 className="text-lg font-semibold text-white">Principales Integraciones</h4>
                </div>

                <div className="space-y-1">
                  {topIntegrations.map((integration, index) => (
                    <IntegrationItem key={integration.id} item={integration} index={index} />
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors duration-300 flex items-center gap-2">
                    <span>Ver todas las integraciones</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
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
                  <h4 className="text-lg font-semibold text-white">Principales Proveedores LLM</h4>
                </div>

                <div className="space-y-1">
                  {topLLMProviders.map((provider, index) => (
                    <IntegrationItem key={provider.id} item={provider} index={index} />
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <button className="text-purple-400 text-sm hover:text-purple-300 transition-colors duration-300 flex items-center gap-2">
                    <span>Ver todos los proveedores</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
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
            <a href="#contact" className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">
              Contacta a nuestro equipo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
