import Projects from "@/components/Projects";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vaay.dev';

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore Caesar Va-ay's portfolio of web applications, automation tools, and software projects. Built with Next.js, React, TypeScript, Python, Django, Flask, and modern web technologies.",
  keywords: [
    "web development projects",
    "Next.js projects",
    "React projects",
    "TypeScript projects",
    "Python projects",
    "full stack projects",
    "developer portfolio projects",
    "web applications",
    "automation tools",
  ],
  openGraph: {
    title: "Projects | Va-ay - Developer Portfolio",
    description: "Explore web applications, automation tools, and software projects built with Next.js, React, TypeScript, Python, Django, and Flask.",
    url: `${siteUrl}/projects`,
    type: "website",
    images: [`${siteUrl}/vaaypp.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Va-ay",
    description: "Explore web applications, automation tools, and software projects built with modern technologies.",
    images: [`${siteUrl}/vaaypp.png`],
  },
  alternates: {
    canonical: `${siteUrl}/projects`,
  },
};

export default async function ProjectPage() {
  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <h1 className="title">my projects.</h1>

      <Projects />
    </article>
  );
}
