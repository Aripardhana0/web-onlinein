"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // REPLACE THIS WITH YOUR N8N WEBHOOK URL
    const WEBHOOK_URL = "https://your-n8n-instance.com/webhook/chat";

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newUserMsg: Message = {
            id: Date.now().toString(),
            text: message,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMsg]);
        setMessage("");
        setStatus("sending");

        try {
            // Attempt to send to webhook
            try {
                await fetch(WEBHOOK_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        message: newUserMsg.text,
                        timestamp: newUserMsg.timestamp.toISOString(),
                        source: "Onlinein Website Chat"
                    }),
                });
            } catch (netError) {
                console.warn("Webhook failed (expected in dev without real URL):", netError);
            }

            // Simulate delay for UX
            await new Promise(resolve => setTimeout(resolve, 1000));

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "Thanks for reaching out! We'll get back to you shortly.",
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMsg]);
            setStatus("idle");

        } catch (error) {
            console.error("Chat error:", error);
            setStatus("error");

            // Add error message as a system note or bot msg
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                text: "Sorry, something went wrong. Please try again.",
                sender: 'bot',
                timestamp: new Date()
            }]);
            setStatus("idle");
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-[300px] md:w-[350px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-black/5"
                    >
                        <div className="bg-[#F4793A] p-4 text-white flex justify-between items-center">
                            <div>
                                <h3 className="font-bold">Chat with Onlinein</h3>
                                <p className="text-xs opacity-90">Web Design & Automation Support</p>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-4 h-[400px] bg-gray-50 flex flex-col">
                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                                {messages.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 text-sm px-4">
                                        <p>Hi! Need help with a new website or automating your business?</p>
                                    </div>
                                ) : (
                                    messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                                    ? 'bg-[#F4793A] text-white rounded-br-none'
                                                    : 'bg-white border border-gray-100 shadow-sm text-gray-800 rounded-bl-none'
                                                    }`}
                                            >
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))
                                )}
                                {status === "sending" && (
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 text-gray-400 text-xs px-3 py-2 rounded-full animate-pulse">
                                            Typing...
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <form onSubmit={handleSubmit} className="relative shrink-0">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="w-full pl-4 pr-12 py-3 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-[#F4793A] outline-none text-sm shadow-sm text-black placeholder:text-gray-400 bg-white"
                                    disabled={status === "sending"}
                                />
                                <button
                                    type="submit"
                                    disabled={status === "sending" || !message.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#F4793A] text-white rounded-lg hover:bg-[#d66025] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send size={16} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="h-14 w-14 rounded-full bg-black text-white flex items-center justify-center shadow-xl hover:bg-[#F4793A] transition-colors"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.button>
        </div>
    );
}
