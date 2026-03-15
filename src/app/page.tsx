import Link from "next/link";
import path from "path";
import { ArrowDownRight, FileDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Socials from "@/components/Socials";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import LinkWithIcon from "@/components/LinkWithIcon";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Projects from "@/components/Projects";
import Posts from "@/components/Posts";
import HeroVideo from "@/components/HeroVideo";
import { getPosts } from "@/lib/posts";

import type { Metadata } from "next";

const blogDirectory = path.join(process.cwd(), "content");
const posts = getPosts(blogDirectory);
const LIMIT = 4;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.caesarisidrovaay.online';

export const metadata: Metadata = {
  title: "Home",
  description: "Caesar Va-ay - Freelance full-stack developer from the Philippines. Specializing in Next.js, React, TypeScript, Python, automation, AI, and machine learning. View my portfolio, projects, and blog.",
  keywords: [
    "Caesar Va-ay",
    "freelance developer Philippines",
    "full stack developer Cebu",
    "Next.js developer",
    "React developer",
    "TypeScript developer",
    "Python developer",
    "web developer portfolio",
  ],
  openGraph: {
    title: "Va-ay | Freelance Full-Stack Developer Portfolio",
    description: "Caesar Va-ay - Freelance full-stack developer from the Philippines. Specializing in Next.js, React, TypeScript, Python, automation, AI, and machine learning.",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/vaaypp.png`,
        width: 1200,
        height: 630,
        alt: "Caesar Va-ay - Freelance Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Va-ay | Freelance Full-Stack Developer",
    description: "Caesar Va-ay - Freelance full-stack developer from the Philippines. Specializing in Next.js, React, TypeScript, Python, automation, AI, and machine learning.",
    images: [`${siteUrl}/vaaypp.png`],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default async function Home() {
  const postsData = await posts;
  
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Caesar Va-ay",
    givenName: "Caesar",
    familyName: "Va-ay",
    jobTitle: "Freelance Full-Stack Software Developer",
    url: siteUrl,
    image: `${siteUrl}/vaaypp.png`,
    email: "caesarisidrovaay@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PH",
      addressRegion: "Cebu",
    },
    sameAs: [
      "https://www.linkedin.com/in/caesar-isidro-va-ay-2b384b193/",
      "https://github.com/lrreverence",
      "https://www.facebook.com/caesarisidro.vaay/",
      "https://www.instagram.com/va.aya.av/",
      "https://x.com/kandilasacake",
    ],
    description: "Freelance full-stack developer from the Philippines specializing in web development, automation, AI, and machine learning. Building modern applications with Next.js, React, TypeScript, Python, Django, and Flask.",
    knowsAbout: [
      "Software Development",
      "Web Development",
      "Full Stack Development",
      "Frontend Development",
      "Backend Development",
      "Automation",
      "Artificial Intelligence",
      "Machine Learning",
      "Data Engineering",
      "Next.js",
      "React",
      "TypeScript",
      "Python",
      "Django",
      "Flask",
      "Node.js",
      "MongoDB",
      "PostgreSQL",
      "Supabase",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "University of the Philippines Cebu",
    },
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="mt-8 flex flex-col gap-8 sm:gap-16 pb-16">
      <section className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-center md:justify-between">
        <HeroVideo />
        <div className="flex flex-col">
          <h1 className="title text-4xl sm:text-5xl">hi va-ay here 👋</h1>
          <p className="mt-4 text-sm sm:text-base font-light">
            Freelance developer from the Philippines 🇵🇭
          </p>
          <p className="mt-2 text-sm sm:text-base font-light">
            Passionate about automation, software development, AI, machine learning, data engineering, and building smart systems.
            I fuel my coding sessions with determination (and probably instant coffee). 🚀
          </p>
          <div className="mt-4 flex items-end gap-1">
            <p className="text-sm sm:text-base font-semibold">Let&apos;s build something amazing together!</p>
            <ArrowDownRight className="size-4 sm:size-5 animate-bounce" />
          </div>
          <section className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <Link href="/resume.pdf" target="_blank" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto">
                <span className="font-semibold">Resume</span>
                <FileDown className="ml-2 size-4 sm:size-5" />
              </Button>
            </Link>
            <Socials />
          </section>
        </div>
      </section>

      <Experience />

      <TechStack />

      <section className="flex flex-col gap-4 sm:gap-8">
        <h2 className="title text-2xl sm:text-3xl">featured projects</h2>
        <Projects limit={LIMIT} />
        <div className="flex justify-center">
          <LinkWithIcon
            href="/projects"
            position="right"
            icon={<ArrowRightIcon className="size-4 sm:size-5" />}
            text="view more"
          />
        </div>
      </section>

      <section className="flex flex-col gap-4 sm:gap-8">
        <h2 className="title text-2xl sm:text-3xl">recent posts</h2>
        <Posts posts={postsData} />
        <div className="flex justify-center">
          <LinkWithIcon
            href="/blog"
            position="right"
            icon={<ArrowRightIcon className="size-4 sm:size-5" />}
            text="view more"
          />
        </div>
      </section>

    </article>
    </>
  );
}
