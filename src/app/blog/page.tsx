import PostsWithSearch from "@/components/PostsWithSearch";
import { getPosts } from "@/lib/posts";
import path from "path";
import type { Metadata } from "next";

const blogDirectory = path.join(process.cwd(), "content");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vaay.dev';

export const metadata: Metadata = {
  title: "Blog",
  description: "Read Caesar Va-ay's blog about software development, web development, AI, machine learning, automation, and building modern applications. Learn from a freelance developer's journey.",
  keywords: [
    "developer blog",
    "software development blog",
    "web development articles",
    "AI machine learning blog",
    "Next.js blog",
    "React blog",
    "programming blog Philippines",
  ],
  openGraph: {
    title: "Blog | Va-ay - Developer Blog",
    description: "Read about software development, web development, AI, machine learning, and building modern applications from a freelance developer's perspective.",
    url: `${siteUrl}/blog`,
    type: "website",
    images: [`${siteUrl}/vaaypp.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Va-ay",
    description: "Read about software development, web development, AI, machine learning, and building modern applications.",
    images: [`${siteUrl}/vaaypp.png`],
  },
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
};

export default async function BlogPage() {
  const posts = await getPosts(blogDirectory);

  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <h1 className="title">my blog.</h1>

      <PostsWithSearch posts={posts} />
    </article>
  );
}
