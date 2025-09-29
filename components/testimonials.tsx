import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useEffect, useState } from "react";

export const dynamic = 'force-dynamic'

export const revalidate = 0

interface Hero {
  titulo1:string;
  PrimerTitulo:string;
  contenido:string;
  testimonio1:string;
  personatestimonio1:string;
  roltestimonio1:string;
  testimonio2:string;
  personatestimonio2:string;
  roltestimonio2:string;
  testimonio3:string;
  personatestimonio3:string;
  roltestimonio3:string;
}


export default async function Testimonials() {
 const res = await fetch("http://34.170.207.129:1337/api/quinto-contenido", {
    cache: "no-store",
  });


  const json = await res.json();

  const hero: Hero | undefined = json.data;


  const testimonials = [
    {
      quote:hero?.testimonio1 ?? "Cargando...",
      name: hero?.personatestimonio1 ?? "Cargando...",
      title: hero?.roltestimonio1 ?? "Cargando...",
      avatar: "SC",
    },
    {
      quote:hero?.testimonio2 ?? "Cargando...",
      name: hero?.personatestimonio2 ?? "Cargando...",
      title: hero?.roltestimonio2 ?? "Cargando...",
      avatar: "MJ",
    },
    {
      quote:hero?.testimonio3 ?? "Cargando...",
      name: hero?.personatestimonio3 ?? "Cargando...",
      title: hero?.roltestimonio3 ?? "Cargando...",
      avatar: "DR",
    },
  ]

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
              {hero?.titulo1 ?? "Cargando..."}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {hero?.PrimerTitulo ?? "Cargando..."}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {hero?.contenido ?? "Cargando..."}
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
