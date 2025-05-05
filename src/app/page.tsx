import Link from "next/link";
import path from "path";
import Image from "next/image";
import { ArrowDownRight, FileDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Socials from "@/components/Socials";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import LinkWithIcon from "@/components/LinkWithIcon";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Projects from "@/components/Projects";
import Posts from "@/components/Posts";
import { getPosts } from "@/lib/posts";
import ChatInterface from "@/components/ChatInterface";

const blogDirectory = path.join(process.cwd(), "content");
const posts = getPosts(blogDirectory);
const LIMIT = 4;

export default async function Home() {
  const postsData = await posts;
  return (
    <article className="mt-8 flex flex-col gap-8 sm:gap-16 pb-16">
      <section className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-center md:justify-between">
        <Image
          className="rounded-lg mx-auto md:mx-0"
          src="/vaaypp.png"
          alt="Photo of Vaay"
          width={175}
          height={175}
          priority
        />
        <div className="flex flex-col">
          <h1 className="title text-4xl sm:text-5xl">hi va-ay here 👋</h1>
          <p className="mt-4 text-sm sm:text-base font-light">
            21-year-old BSCS student from the Philippines 🇵🇭
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

      <section className="flex flex-col gap-4 sm:gap-8">
        <h2 className="title text-2xl sm:text-3xl">chat with my portfolio</h2>
        <ChatInterface />
      </section>
    </article>
  );
}
