import LinkWithIcon from "@/components/LinkWithIcon";
import MDXContent from "@/components/MDXContent";
import { getPostBySlug, getPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { notFound } from "next/navigation";
import path from "path";
import type { Metadata } from "next";

const blogDirectory = path.join(process.cwd(), "content");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vaay.dev';

export async function generateStaticParams() {
  const posts = await getPosts(blogDirectory);
  const slugs = posts.map((post) => ({ slug: post.slug }));

  return slugs;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(blogDirectory, params.slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const { title, summary, image, publishedAt } = post.metadata;
  const imageUrl = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/vaaypp.png`;
  const postTitle = title || "Blog Post";
  const postDescription = summary || `Read ${postTitle} by Caesar Va-ay - Freelance developer sharing insights on software development, web development, AI, and technology.`;
  const postUrl = `${siteUrl}/blog/${params.slug}`;

  return {
    title: postTitle,
    description: postDescription,
    keywords: [
      "developer blog",
      "software development",
      "web development",
      "programming",
      "technology blog",
      "Caesar Va-ay",
    ],
    authors: [{ name: "Caesar Va-ay" }],
    openGraph: {
      title: postTitle,
      description: postDescription,
      type: "article",
      publishedTime: publishedAt,
      authors: ["Caesar Va-ay"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: postTitle,
        },
      ],
      url: postUrl,
      siteName: "Va-ay Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title: postTitle,
      description: postDescription,
      images: [imageUrl],
      creator: "@kandilasacake",
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getPostBySlug(blogDirectory, slug);

  if (!post) {
    notFound();
  }

  const { metadata, content } = post;
  const { title, image, publishedAt, summary } = metadata;
  const imageUrl = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/vaaypp.png`;
  const postUrl = `${siteUrl}/blog/${slug}`;

  // Article structured data for SEO
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title || "Blog Post",
    description: summary || `Read ${title || "this article"} by Caesar Va-ay`,
    image: imageUrl,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: {
      "@type": "Person",
      name: "Caesar Va-ay",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Caesar Va-ay",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/vaaypp.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    url: postUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <article className="mt-8 flex flex-col gap-8 pb-16">
      <LinkWithIcon
        href="/blog"
        position="left"
        icon={<ArrowLeftIcon className="size-5" />}
        text="back to blog"
      />

      {image && (
        <div className="relative mb-6 h-96 w-full overflow-hidden rounded-lg">
          <Image src={image} alt={title || ""} className="object-cover" fill />
        </div>
      )}

      <header>
        <h1 className="title">{title}</h1>
        <p className="mt-2 text-xs text-muted-foreground">
          {formatDate(publishedAt ?? "")}
        </p>
      </header>

      <main className="prose dark:prose-invert">
        <MDXContent source={content} />
      </main>
    </article>
    </>
  );
}
