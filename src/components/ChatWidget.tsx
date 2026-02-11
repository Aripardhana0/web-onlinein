"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

    // We use a Local API Route to proxy the request to n8n
    // This avoids CORS errors from the browser
    const WEBHOOK_URL = "/api/chat";

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
            let botText = "Thanks for reaching out! We'll get back to you shortly.";

            // Attempt to send to webhook
            const response = await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: newUserMsg.text,
                    timestamp: newUserMsg.timestamp.toISOString(),
                    source: "Onlinein Website Chat"
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.text) {
                    botText = data.text;
                }
            } else {
                console.warn("API Error:", response.status);
            }

            // Simulate small delay for natural feel if response was too fast
            // await new Promise(resolve => setTimeout(resolve, 500)); 
            // Actually, n8n takes time, so we often don't need extra delay.

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: botText,
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
                text: "Sorry, I couldn't reach the server. Please try again later.",
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
                                                // Increased max-width to 92% for fuller look
                                                className={`max-w-[92%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                                    ? 'bg-[#F4793A] text-white rounded-br-none'
                                                    : 'bg-white border border-gray-100 shadow-sm text-gray-800 rounded-bl-none'
                                                    }`}
                                            >
                                                {msg.sender === 'user' ? (
                                                    // User messages are usually just text, but we can markdown them too if we want.
                                                    // Keeping simple text for user to match input exactly is often safer/cleaner.
                                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                                ) : (
                                                    // Bot messages get full Markdown rendering
                                                    <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-gray-100 prose-pre:text-gray-800 prose-ul:list-disc prose-ul:pl-4 prose-ol:list-decimal prose-ol:pl-4 prose-a:text-blue-500 prose-a:underline">
                                                        <ReactMarkdown
                                                            remarkPlugins={[remarkGfm]}
                                                            components={{
                                                                // Removed 'node' destructuring to avoid 'any' type error
                                                                p: ({ ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                                                ul: ({ ...props }) => <ul className="mb-2 last:mb-0 list-disc pl-4" {...props} />,
                                                                ol: ({ ...props }) => <ol className="mb-2 last:mb-0 list-decimal pl-4" {...props} />,
                                                                li: ({ ...props }) => <li className="mb-0.5" {...props} />,
                                                                strong: ({ ...props }) => <span className="font-bold" {...props} />,
                                                                a: ({ ...props }) => <a target="_blank" rel="noopener noreferrer" className="underline font-medium hover:opacity-80 transition-opacity" {...props} />
                                                            }}
                                                        >
                                                            {msg.text}
                                                        </ReactMarkdown>
                                                    </div>
                                                )}
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
