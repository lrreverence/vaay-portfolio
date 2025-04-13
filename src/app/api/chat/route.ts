import { NextResponse } from 'next/server';
import { getPortfolioContent } from '@/lib/portfolio';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const portfolioContent = getPortfolioContent();

    // Debug logging
    console.log('API Key exists:', !!process.env.OPENROUTER_API_KEY);
    console.log('Site URL:', process.env.NEXT_PUBLIC_SITE_URL);
    console.log('Portfolio content length:', portfolioContent.length);

    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error('OpenRouter API key is not configured');
    }

    const requestBody = {
      model: "deepseek/deepseek-v3-base:free",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that knows about my portfolio. Use the following context to answer questions. If the answer is not in the context, say so. Context: ${portfolioContent}`
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1000,
    };

    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'Vaay Portfolio',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Response status:', response.status);
    console.log('Response status text:', response.statusText);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter API Error:', errorData);
      throw new Error(`OpenRouter API Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return NextResponse.json({ response: data.choices[0].message.content });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to process chat request. Please try again later.',
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 