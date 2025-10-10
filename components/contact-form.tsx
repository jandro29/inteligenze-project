"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[400px] text-center">
          <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
          <h3 className="text-2xl font-bold mb-2">¡Gracias!</h3>
          <p className="text-muted-foreground mb-6">
            Tu consulta ha sido recibida. Nuestro equipo empresarial se pondrá
            en contacto contigo pronto para discutir tus requisitos específicos.
          </p>
          <Button onClick={() => setIsSubmitted(false)}>
            Enviar Otra Consulta
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contacta a Nuestro Equipo Empresarial</CardTitle>
        <CardDescription>
          Completa el formulario a continuación para discutir las necesidades de
          tu organización y recibir una cotización personalizada.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <iframe
          title="Formulario de Contacto HubSpot"
          src="https://share.hsforms.com/1HM6pke0dSdieDn89CnrnOAfd8mc"
          width="100%"
          height="800"
          frameBorder="0"
          style={{ border: 'none' }}
        />
      </CardContent>
    </Card>
  );
}