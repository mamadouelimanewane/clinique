"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Bot, User, Phone, Calendar, AlertCircle, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

type Message = {
    id: string
    sender: "bot" | "patient"
    text: string
    time: string
    action?: string
}

export function WhatsAppAiConcierge() {
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", sender: "bot", text: "Bonjour ! Je suis l'assistant IA de la Clinique Aéré Lao. Comment puis-je vous aider aujourd'hui ?", time: "14:00" }
    ])
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)

    const handleSend = async () => {
        if (!input.trim()) return

        const userText = input
        const newMessage: Message = { id: Date.now().toString(), sender: "patient", text: userText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        setMessages(prev => [...prev, newMessage])
        setInput("")
        setIsTyping(true)

        try {
            const response = await fetch("/api/ai/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userText,
                    context: { clinic: "Aéré Lao", language: "Français" }
                })
            })

            const data = await response.json()

            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                sender: "bot",
                text: data.response || "Désolé, je rencontre une erreur technique.",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                action: userText.toLowerCase().includes("urgent") ? "Appel Urgence" : "Prendre RDV"
            }

            setMessages(prev => [...prev, botResponse])
        } catch (error) {
            console.error("Chat Error:", error)
            toast.error("Erreur de connexion à l'IA")
        } finally {
            setIsTyping(false)
        }
    }

    return (
        <Card className="h-[600px] flex flex-col border-emerald-200 shadow-xl overflow-hidden rounded-3xl">
            <CardHeader className="bg-emerald-600 text-white p-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                            <Bot className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-sm font-black">Conciergerie IA 24/7</CardTitle>
                            <CardDescription className="text-[10px] text-emerald-100 font-bold uppercase tracking-widest">En ligne • WhatsApp Business</CardDescription>
                        </div>
                    </div>
                    <Badge className="bg-emerald-400 text-emerald-900 border-none font-black text-[9px]">ALPHA 2026</Badge>
                </div>
            </CardHeader>

            <CardContent className="flex-1 p-0 flex flex-col bg-[#e5ddd5]">
                <ScrollArea className="flex-1 p-4 space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'} mb-4`}>
                            <div className={`max-w-[80%] p-3 rounded-2xl text-xs shadow-sm ${msg.sender === 'patient' ? 'bg-[#dcf8c6] rounded-tr-none' : 'bg-white rounded-tl-none'}`}>
                                <p className="font-medium text-slate-800 leading-relaxed">{msg.text}</p>
                                <div className="flex items-center justify-end gap-1 mt-1">
                                    <span className="text-[9px] text-slate-400">{msg.time}</span>
                                    {msg.sender === 'patient' && <CheckCircle2 className="h-3 w-3 text-blue-500" />}
                                </div>
                                {msg.action && (
                                    <Button size="sm" className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700 text-[10px] font-bold h-7">
                                        {msg.action === 'Prendre RDV' ? <Calendar className="h-3 w-3 mr-1" /> : <Phone className="h-3 w-3 mr-1" />}
                                        {msg.action}
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                                <span className="h-1.5 w-1.5 bg-slate-300 rounded-full animate-bounce" />
                                <span className="h-1.5 w-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                                <span className="h-1.5 w-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                            </div>
                        </div>
                    )}
                </ScrollArea>

                <div className="p-3 bg-[#f0f0f0] flex gap-2 items-center">
                    <Input
                        placeholder="Tapez votre message..."
                        className="bg-white border-none rounded-full h-10 text-xs"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <Button size="icon" className="bg-emerald-600 rounded-full h-10 w-10 shrink-0" onClick={handleSend}>
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
