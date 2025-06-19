"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

export default function TypingPromptInput() {
  const prompts = [
    "Analiza los comentarios de nuestros clientes del mes pasado e identifica tendencias clave...",
    "Resume los últimos documentos de política y destaca cambios importantes...",
    "Crea un artículo de base de conocimientos sobre nuestras nuevas características de seguridad...",
    "Genera un informe sobre las métricas de rendimiento de nuestro departamento...",
    "Redacta una respuesta a la RFP gubernamental basada en nuestras propuestas anteriores...",
  ]

  const [displayText, setDisplayText] = useState("")
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)

  // Controla la velocidad de escritura
  const typingSpeed = 50 // milisegundos por carácter
  const deletingSpeed = 20 // milisegundos por carácter
  const pauseBeforeDelete = 2000 // pausa antes de borrar
  const pauseBeforeNextPrompt = 500 // pausa antes del siguiente prompt

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isTyping) {
      // Animación de escritura
      if (currentCharIndex < prompts[currentPromptIndex].length) {
        timeout = setTimeout(() => {
          setDisplayText(prompts[currentPromptIndex].substring(0, currentCharIndex + 1))
          setCurrentCharIndex(currentCharIndex + 1)
        }, typingSpeed)
      } else {
        // Terminó de escribir, pausa antes de borrar
        timeout = setTimeout(() => {
          setIsTyping(false)
        }, pauseBeforeDelete)
      }
    } else {
      // Animación de borrado
      if (currentCharIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayText(prompts[currentPromptIndex].substring(0, currentCharIndex - 1))
          setCurrentCharIndex(currentCharIndex - 1)
        }, deletingSpeed)
      } else {
        // Terminó de borrar, pasar al siguiente prompt
        timeout = setTimeout(() => {
          setCurrentPromptIndex((currentPromptIndex + 1) % prompts.length)
          setIsTyping(true)
        }, pauseBeforeNextPrompt)
      }
    }

    return () => clearTimeout(timeout)
  }, [currentCharIndex, currentPromptIndex, isTyping, prompts])

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative group">
        {/* Efecto de brillo exterior */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-primary/30 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>

        <div className="relative">
          <Input
            className="pr-20 py-6 text-base rounded-xl backdrop-blur-md border-2 focus-visible:ring-0 focus-visible:ring-offset-0 
            dark:bg-background/20 dark:border-white/5 dark:text-white
            bg-white/80 border-primary/10 text-gray-800 shadow-[0_4px_20px_rgba(36,101,237,0.2)]"
            placeholder=""
            value={displayText}
            readOnly
          />
          <Button
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 
            bg-primary/90 hover:bg-primary backdrop-blur-md shadow-md"
            aria-label="Enviar mensaje"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
