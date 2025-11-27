import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/posts';
import path from 'path';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vaay.dev';
const blogDirectory = path.join(process.cwd(), "content");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts(blogDirectory);
  
  const blogPosts = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const routes = [
    '',
    '/blog',
    '/projects',
    '/contact',
    '/privacy',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes, ...blogPosts];
}

