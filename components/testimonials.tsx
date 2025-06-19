import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Esta plataforma IA ha transformado cómo nuestra organización maneja la gestión del conocimiento y soporte al cliente. Las características de seguridad nos dan tranquilidad al manejar datos sensibles.",
      name: "Sarah Chen",
      title: "CTO, Servicios Financieros Globales",
      avatar: "SC",
    },
    {
      quote:
        "La capacidad de personalizar agentes e integrar con nuestros sistemas existentes ha hecho esta plataforma invaluable para nuestras operaciones gubernamentales. El ROI ha sido sustancial.",
      name: "Michael Johnson",
      title: "Director de TI, Agencia Gubernamental",
      avatar: "MJ",
    },
    {
      quote:
        "Hemos visto un aumento del 40% en productividad desde implementar esta solución. La integración de base de conocimientos y plantillas de prompts personalizadas han sido revolucionarias.",
      name: "David Rodriguez",
      title: "Jefe de Innovación, Tecnología Empresarial",
      avatar: "DR",
    },
  ]

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
              Testimonios
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Confiado por Organizaciones Líderes
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Ve lo que nuestros clientes empresariales y gubernamentales dicen sobre nuestra plataforma IA.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full flex flex-col">
              <CardContent className="pt-6 flex-grow">
                <div className="mb-4 text-4xl">"</div>
                <p className="italic text-muted-foreground">{testimonial.quote}</p>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
