"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CheckCircle2 } from "lucide-react"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envío de formulario
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[400px] text-center">
          <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
          <h3 className="text-2xl font-bold mb-2">¡Gracias!</h3>
          <p className="text-muted-foreground mb-6">
            Tu consulta ha sido recibida. Nuestro equipo empresarial se pondrá en contacto contigo pronto para discutir
            tus requisitos específicos.
          </p>
          <Button onClick={() => setIsSubmitted(false)}>Enviar Otra Consulta</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contacta a Nuestro Equipo Empresarial</CardTitle>
        <CardDescription>
          Completa el formulario a continuación para discutir las necesidades de tu organización y recibir una
          cotización personalizada.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre</Label>
              <Input id="firstName" placeholder="Juan" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input id="lastName" placeholder="Pérez" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email de Trabajo</Label>
            <Input id="email" type="email" placeholder="juan.perez@empresa.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Empresa/Organización</Label>
            <Input id="company" placeholder="Acme Inc." required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Tu Cargo</Label>
            <Input id="role" placeholder="CTO, Director de TI, etc." required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="size">Tamaño de la Organización</Label>
            <Select>
              <SelectTrigger id="size">
                <SelectValue placeholder="Selecciona el tamaño de la organización" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-50">1-50 empleados</SelectItem>
                <SelectItem value="51-200">51-200 empleados</SelectItem>
                <SelectItem value="201-500">201-500 empleados</SelectItem>
                <SelectItem value="501-1000">501-1000 empleados</SelectItem>
                <SelectItem value="1001+">1001+ empleados</SelectItem>
                <SelectItem value="government">Agencia Gubernamental</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">¿Cómo podemos ayudarte?</Label>
            <Textarea
              id="message"
              placeholder="Cuéntanos sobre tus requisitos específicos y casos de uso..."
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Solicitar Información"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Al enviar este formulario, aceptas nuestra política de privacidad y términos de servicio.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
