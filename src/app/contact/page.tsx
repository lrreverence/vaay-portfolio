import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.caesarisidrovaay.online';

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Caesar Va-ay for freelance web development projects, software development, automation solutions, or collaborations. Available for Next.js, React, TypeScript, and Python projects.",
  keywords: [
    "hire freelance developer",
    "contact web developer",
    "freelance developer Philippines",
    "hire Next.js developer",
    "hire React developer",
    "software development services",
  ],
  openGraph: {
    title: "Contact | Va-ay - Freelance Developer",
    description: "Contact me for freelance web development projects, software development, automation solutions, or collaborations.",
    url: `${siteUrl}/contact`,
    type: "website",
    images: [`${siteUrl}/vaaypp.png`],
  },
  twitter: {
    card: "summary",
    title: "Contact | Va-ay",
    description: "Contact me for freelance projects, collaborations, or just to say hello.",
  },
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
};

export default function ContactPage() {
  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <h1 className="title">contact me.</h1>
      
      <ContactForm />
    </article>
  );
}
