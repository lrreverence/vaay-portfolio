import ContactForm from "@/components/ContactForm";
import CalendlyEmbed, { CALENDLY_URL } from "@/components/CalendlyEmbed";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.caesarisidrovaay.online';

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a 30-minute call with Caesar Va-ay or send a message about freelance web development, automation, AI, or collaboration.",
  keywords: [
    "hire freelance developer",
    "contact web developer",
    "book a call",
    "Calendly",
    "freelance developer Philippines",
    "hire Next.js developer",
    "hire React developer",
    "software development services",
  ],
  openGraph: {
    title: "Contact | Va-ay - Freelance Developer",
    description: "Book a 30-minute call or send a message about freelance web development, automation, AI, or collaboration.",
    url: `${siteUrl}/contact`,
    type: "website",
    images: [`${siteUrl}/vaaypp.png`],
  },
  twitter: {
    card: "summary",
    title: "Contact | Va-ay",
    description: "Book a 30-minute call or send a message about freelance projects and collaborations.",
  },
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
};

export default function ContactPage() {
  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <h1 className="title">contact me.</h1>

      <section className="flex flex-col gap-4">
        <h2 className="title text-2xl sm:text-3xl">
          book a 30 minute meeting with me.
        </h2>
        <p className="text-sm sm:text-base font-light">
          Grab a time that works — we&apos;ll talk through the project.
        </p>
        <CalendlyEmbed />
        <p className="text-xs text-muted-foreground">
          Calendar not loading?{" "}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="link font-semibold"
          >
            Open Calendly
          </a>
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="title text-2xl sm:text-3xl">or send a message.</h2>
        <ContactForm />
      </section>
    </article>
  );
}
