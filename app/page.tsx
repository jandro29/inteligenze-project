import { Button } from "@/components/ui/button"
import { Bot, Database, Shield, Users, Zap } from "lucide-react"
import ContactForm from "@/components/contact-form"
import Testimonials from "@/components/testimonials"
import UseCases from "@/components/use-cases"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import TypingPromptInput from "@/components/typing-prompt-input"
import FramerSpotlight from "@/components/framer-spotlight"
import CssGridBackground from "@/components/css-grid-background"
import FeaturesSection from "@/components/features-section"
import StructuredData from "@/components/structured-data"
import EfficiencyHighlights from "@/components/efficiency-highlights"
import IntegrationsGallery from "@/components/integrations-gallery"
import FAQSection from "@/components/faq-section"

export default function Home() {
  return (
    <>
      <StructuredData />
      <div className="flex min-h-screen flex-col">
        <Navbar />

        {/* Sección Hero */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <CssGridBackground />
          <FramerSpotlight />
          <div className="container px-4 md:px-6 py-16 md:py-20">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm mb-6">Solución IA Empresarial</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
                Conversaciones IA Seguras para Empresas y Gobierno
              </h1>
              <p className="text-xl text-muted-foreground md:text-2xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-2xl mb-12">
                Desbloquea el poder de la IA con seguridad de nivel empresarial, agentes personalizables y gestión
                integral del conocimiento.
              </p>

              <TypingPromptInput />

              <div className="flex flex-wrap justify-center gap-3 mt-16">
                <Button className="flex items-center gap-3 px-5 py-6 h-[60px] bg-[#1a1d21] hover:bg-[#2a2d31] text-white rounded-xl border-0 dark:bg-primary dark:hover:bg-primary/90 dark:shadow-[0_0_15px_rgba(36,101,237,0.5)] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 dark:opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                  <Zap className="h-5 w-5 text-white relative z-10" />
                  <div className="flex flex-col items-start relative z-10">
                    <span className="text-[15px] font-medium">Solicitar Demo</span>
                    <span className="text-xs text-gray-400 dark:text-gray-300 -mt-0.5">v1.0.0</span>
                  </div>
                </Button>
                <Button className="px-5 py-6 h-[60px] rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-[15px] font-medium text-foreground">
                  Saber Más
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Características */}
        <FeaturesSection />

        {/* Cómo Funciona */}
        <section className="py-20" id="how-it-works" aria-labelledby="how-it-works-heading">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 id="how-it-works-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Cómo Funciona
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Nuestra plataforma se integra perfectamente con tus flujos de trabajo y sistemas existentes.
                </p>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 items-start">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold">Conecta Tus Datos</h3>
                <p className="text-muted-foreground">
                  Conecta de forma segura la base de conocimientos, documentos y fuentes de datos de tu organización.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold">Configura Tu IA</h3>
                <p className="text-muted-foreground">
                  Elige LLMs, configura agentes y personaliza plantillas de prompts para satisfacer tus necesidades.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold">Despliega y Escala</h3>
                <p className="text-muted-foreground">
                  Implementa en tu organización con seguridad de nivel empresarial y escala según sea necesario.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Casos de Uso */}
        <UseCases />

        {/* Testimonios */}
        <Testimonials />

        {/* Destacados de Eficiencia */}
        <EfficiencyHighlights />

        {/* Galería de Integraciones */}
        <IntegrationsGallery />

        {/* Sección FAQ */}
        <FAQSection />

        {/* Sección de Contacto/Precios */}
        <section id="contact" className="py-20 bg-muted/50 dark:bg-muted/10" aria-labelledby="contact-heading">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 id="contact-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Precios Empresariales Personalizados
                  </h2>
                  <p className="text-muted-foreground md:text-xl">
                    Ofrecemos paquetes de precios personalizados para empresas y agencias gubernamentales basados en tus
                    necesidades específicas y escala.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Usuarios ilimitados con control de acceso basado en roles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    <span>Tamaño de base de conocimientos personalizable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    <span>Acceso a todos los modelos LLM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Seguridad y cumplimiento de nivel empresarial</span>
                  </div>
                </div>
                <div className="pt-4">
                  <p className="font-medium">
                    Contáctanos para una cotización personalizada y para discutir tus requisitos específicos.
                  </p>
                </div>
              </div>
              <div className="lg:ml-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
