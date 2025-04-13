'use client'

import { useState } from 'react'
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
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-[#1a1b26] text-white px-4 py-3 rounded-lg hover:bg-[#1f2937] transition-colors shadow-lg w-[320px]"
        >
          <div className="flex items-center gap-2 flex-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-lg">Chat with</span>
            <span className="font-medium text-lg">Vaay Support</span>
          </div>
          <ChevronDown size={20} />
        </button>
      ) : (
        <div className="w-[320px] bg-[#1a1b26] rounded-lg shadow-lg overflow-hidden">
          <button 
            onClick={() => setIsOpen(false)}
            className="w-full p-3 border-b border-gray-700 flex items-center justify-between hover:bg-[#1f2937] transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-white text-lg">Chat with</span>
              <span className="text-white font-medium text-lg">Vaay Support</span>
            </div>
            <ChevronDown size={20} className="text-white" />
          </button>
          
          <div className="h-[350px] overflow-y-auto p-4 flex flex-col gap-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-2.5 rounded-lg text-sm ${
                    message.isBot
                      ? 'bg-gray-700 text-white'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-white p-2.5 rounded-lg text-sm">
                  Typing...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                className="flex-1 bg-gray-700 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-1.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:hover:bg-blue-600"
                disabled={isLoading}
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
