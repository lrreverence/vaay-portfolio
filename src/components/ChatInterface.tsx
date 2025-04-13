'use client';

import dynamic from 'next/dynamic'

// Dynamically import the Chat component with no SSR to avoid hydration issues
const Chat = dynamic(() => import('./Chat'), { ssr: false })

export default function ChatInterface() {
  return <Chat />
} 