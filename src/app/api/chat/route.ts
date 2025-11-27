import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import careerData from '@/data/career.json';
import projectsData from '@/data/projects.json';
import educationData from '@/data/education.json';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured. Please add OPENAI_API_KEY to your environment variables.');
    }

    // Format work experience for the system prompt
    const workExperience = careerData.career.map(job => {
      return `- ${job.title} at ${job.name} (${job.start} - ${job.end || 'Present'})${job.location ? ` - ${job.location}` : ''}
  ${job.description ? job.description.map(desc => `  • ${desc}`).join('\n') : ''}`;
    }).join('\n\n');

    // Format projects for the system prompt
    const projects = projectsData.projects.map(project => {
      return `- ${project.name}: ${project.description}
  Technologies: ${project.tags.join(', ')}
  ${project.links && project.links.length > 0 ? `Links: ${project.links.map(link => link.href).join(', ')}` : ''}`;
    }).join('\n\n');

    // Format education for the system prompt
    const education = educationData.education.map(edu => {
      return `- ${edu.title} at ${edu.name} (${edu.start} - ${edu.end || 'Present'})${edu.location ? ` - ${edu.location}` : ''}
  ${edu.description ? edu.description.map(desc => `  • ${desc}`).join('\n') : ''}`;
    }).join('\n\n');

    const systemPrompt = `You are a helpful assistant for Caesar's portfolio website. You have access to detailed information about Caesar's work experience, projects, and education. When asked about these topics, provide specific and detailed answers based on the information below.

WORK EXPERIENCE:
${workExperience}

PROJECTS:
${projects}

EDUCATION:
${education}

When users ask about Caesar's work experience, projects, skills, or education, provide detailed and specific answers. Be conversational and helpful. If asked about "work experience" or "Caesar's work experience", list all the work experiences above with details.`;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const response = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to process chat request. Please try again later.',
      },
      { status: 500 }
    );
  }
} 