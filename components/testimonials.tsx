import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useEffect, useState } from "react";

export const dynamic = 'force-dynamic'

export const revalidate = 0

interface Hero {
  titulo: string;
  subtitulo: string;
  primercomentariobox : string;
  primercomentariopersonabox : string;
  puestoprimercomentariobox : string;
  segundocomentariobox: string;
  segundocomentariopersonabox : string;
  puestosegundocomentariobox : string;
  tercercomentariobox : string;
  tercercomentariopersonabox : string;
  puestotercercomentariobox : string;
}


export default async function Testimonials() {
 const res = await fetch("http://35.238.156.185:1337/api/fivesection", {
    cache: "no-store",
  });


  const json = await res.json();

  const hero: Hero | undefined = json.data;


  const testimonials = [
    {
      quote:hero?.primercomentariobox ?? "Cargando...",
      name: hero?.primercomentariopersonabox ?? "Cargando...",
      title: hero?.puestoprimercomentariobox ?? "Cargando...",
      avatar: "SC",
    },
    {
      quote:hero?.segundocomentariobox ?? "Cargando...",
      name: hero?.segundocomentariopersonabox ?? "Cargando...",
      title: hero?.puestosegundocomentariobox ?? "Cargando...",
      avatar: "MJ",
    },
    {
      quote:hero?.tercercomentariobox ?? "Cargando...",
      name: hero?.tercercomentariopersonabox ?? "Cargando...",
      title: hero?.puestotercercomentariobox ?? "Cargando...",
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
              {hero?.titulo ?? "Cargando..."}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {hero?.subtitulo ?? "Cargando..."}
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
