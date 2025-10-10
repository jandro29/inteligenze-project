"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

declare global {
  interface Window {
    hbspt: any;
  }
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef(null);

  // 👇 --- Integración correcta de HubSpot ---
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://js.hsforms.net/forms/embed/46621915.js"]'
    );

    const createForm = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: "na1",
          portalId: "46621915",
          formId: "1ceca991-5d13-49dd-9e0b-7f3d09ae7cee",
          target: "#hubspotForm",
        });
      }
    };

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://js.hsforms.net/forms/embed/46621915.js";
      script.defer = true;
      script.onload = createForm;
      document.body.appendChild(script);
    } else {
      createForm();
    }
  }, []);
  // 👆 --- Fin integración HubSpot ---

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

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
        {/* ✅ Aquí se montará dinámicamente el formulario de HubSpot */}
        <div id="hubspotForm" ref={formRef}></div>
      </CardContent>
    </Card>
  );
}
