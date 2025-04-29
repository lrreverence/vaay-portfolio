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
    <article className="mt-8 flex flex-col gap-16 pb-16">
      <section className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-center md:justify-between">
        <Image
          className="rounded-lg"
          src="/vaaypp.png"
          alt="Photo of Vaay"
          width={175}
          height={175}
          priority
        />
        <div className="flex flex-col">
          <h1 className="title text-5xl">hi va-ay here 👋</h1>
          <p className="mt-4 font-light">
            {/* Update my age */}
            21-year-old BSCS student from the Philippines 🇵🇭
          </p>
          <p className="mt-2 font-light">
            Passionate about agriculture tech, software development, AI, machine learning, data engineering, and building smart systems.
            I fuel my coding sessions with determination (and probably instant coffee). 🚀
          </p>
          <div className="mt-4 flex items-end gap-1">
            <p className="font-semibold">Let&apos;s build something amazing together!</p>
            <ArrowDownRight className="size-5 animate-bounce" />
          </div>
          <section className="mt-8 flex items-center gap-8">
            <Link href="/resume.pdf" target="_blank">
              <Button variant="outline">
                <span className="font-semibold">Resume</span>
                <FileDown className="ml-2 size-5" />
              </Button>
            </Link>
            <Socials />
          </section>
        </div>
      </section>

      <Experience />

      <TechStack />

      <section className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h2 className="title text-2xl sm:text-3xl">featured projects</h2>
          <LinkWithIcon
            href="/projects"
            position="right"
            icon={<ArrowRightIcon className="size-5" />}
            text="view more"
          />
        </div>
        <Projects limit={LIMIT} />
      </section>

      <section className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h2 className="title text-3xl">recent posts</h2>
          <LinkWithIcon
            href="/blog"
            position="right"
            icon={<ArrowRightIcon className="size-5" />}
            text="view more"
          />
        </div>
        <Posts posts={postsData} />
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="title text-3xl">chat with my portfolio</h2>
        <ChatInterface />
      </section>
    </article>
  );
}
