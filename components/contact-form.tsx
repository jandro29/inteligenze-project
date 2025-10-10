"use client";

import type React from "react";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    // Cargar el script de HubSpot
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/embed/46621915.js";
    script.defer = true;
    script.charset = "utf-8";
    script.type = "text/javascript";
    
    document.body.appendChild(script);

    // Cleanup: remover el script cuando el componente se desmonte
    return () => {
      const existingScript = document.querySelector(
        'script[src="https://js.hsforms.net/forms/embed/46621915.js"]'
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

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
        <div
          className="hs-form-frame"
          data-region="na1"
          data-form-id="1ceca991-5d13-49dd-9e0b-7f3d09ae7cee"
          data-portal-id="46621915"
        />
      </CardContent>
    </Card>
  );
}