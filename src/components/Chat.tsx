'use client'

import { useState, useEffect } from 'react'
import { Send, MessageCircle, ChevronDown } from 'lucide-react'

interface Message {
  content: string
  isBot: boolean
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: 'You can ask the bot anything about me and it will help to find the relevant information!',
      isBot: true,
    },
  ])
  const [input, setInput] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showGuide, setShowGuide] = useState(true)

  useEffect(() => {
    if (showGuide) {
      const timer = setTimeout(() => {
        setShowGuide(false)
      }, 7000)

      return () => clearTimeout(timer)
    }
  }, [showGuide])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = { content: input, isBot: false }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.concat(userMessage).map(msg => ({
            role: msg.isBot ? 'assistant' : 'user',
            content: msg.content
          }))
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      setMessages(prev => [...prev, { content: data.response, isBot: true }])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, { 
        content: 'Sorry, I encountered an error. Please try again.',
        isBot: true 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-start gap-1 bg-background text-foreground px-4 py-3 rounded-xl hover:bg-muted transition-colors shadow-lg w-[240px] border sm:block hidden"
        >
          <div className="flex items-center gap-2"> <span className="text-sm font-normal mb-1">Chat with</span></div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-blink"></div>
            <span className="text-sm font-medium">Va-ay Support</span>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <ChevronDown size={20} />
          </div>
        </button>
      ) : (
        <div className="w-[240px] sm:w-[300px] bg-background text-foreground rounded-xl shadow-2xl border border-border/60 overflow-hidden">
          <button 
            onClick={() => setIsOpen(false)}
            className="w-full p-3 border-b border-border/60 flex flex-col items-start bg-background/80 backdrop-blur-sm hover:bg-muted transition-colors"
          >
            <span className="text-sm font-normal mb-1">Chat with</span>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-blink"></div>
              <span className="text-sm font-medium">Va-ay Support</span>
            </div>
            <div className="absolute right-4 top-6">
              <ChevronDown size={20} />
            </div>
          </button>
          
          <div className="h-[350px] overflow-y-auto p-4 flex flex-col gap-4 bg-background">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-base leading-relaxed shadow-sm border border-border/40 ${
                    message.isBot
                      ? 'bg-muted text-foreground [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)]'
                      : 'bg-primary text-primary-foreground [text-shadow:_0_1px_1px_rgb(0_0_0_/_20%)]'
                  }`}
                >
                  {index === 0 ? <span className="text-sm">{message.content}</span> : message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground px-4 py-2 rounded-2xl text-sm border border-border/40 shadow-sm">
                  Typing...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t border-border/60 bg-background/90">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                className="flex-1 bg-muted text-foreground rounded-xl px-3 py-2 text-sm border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/60 transition disabled:opacity-60"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground p-2 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:hover:bg-primary"
                disabled={isLoading}
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile floating button */}
      {!isOpen && (
        <div className="sm:hidden fixed bottom-4 right-4 z-40">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-blink absolute top-4 left-3/4 -translate-x-1/2 z-50"></div>
          {showGuide && (
            <div className="absolute bottom-14 right-0 w-[200px] bg-muted text-foreground p-2 rounded-xl shadow-lg border border-border/60 mb-2">
              <div className="flex justify-between items-start mb-0.5">
                <span className="text-xs font-medium">Chat with AI Guide</span>
                <button 
                  onClick={() => setShowGuide(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground">Ask me anything about my portfolio</p>
            </div>
          )}
          <button
            onClick={() => setIsOpen(true)}
            className="bg-muted text-foreground p-4 rounded-full shadow-lg hover:bg-muted/80 transition-colors relative border border-border/60"
          >
            <MessageCircle size={24} />
          </button>
        </div>
      )}
    </div>
  )
}