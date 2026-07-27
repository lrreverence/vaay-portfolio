import Link from "next/link";
import type { Metadata } from "next";

const lastUpdated = "Jul 2026";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.caesarisidrovaay.online';

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Caesar Va-ay's portfolio website. Learn how your information is collected and used.",
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
};

export default function page() {
  return (
    <article className="prose mt-8 pb-16 dark:prose-invert">
      <div className="space-y-4">
        <h1 className="title text-5xl">privacy policy.</h1>
        <p>Last Updated: {lastUpdated}</p>
      </div>
      <div className="space-y-4">
        <h2 className="title text-3xl">Hey, Welcome!</h2>
        <p>
          Thanks for stopping by! This <b>Privacy Policy</b> is just here to let
          you know how things work around here. My website is mainly about
          showcasing my work, and I&apos;m all about respecting your privacy.
        </p>
        <h2 className="title">What Information I Collect (Hint: Not Much)</h2>
        <p>
          This is mainly a portfolio site. There&apos;s no account creation, and
          I don&apos;t sell or rent your personal information.
        </p>
        <h3>1. Contact Info</h3>
        <p>
          If you reach out via email or the contact form, the info you provide
          is entirely up to you. I&apos;ll only use it to reply and have a
          conversation with you—no funny business.
        </p>
        <h3>2. Analytics</h3>
        <p>
          I use Microsoft Clarity and Vercel Analytics to understand how people
          use the site (for example, page views, clicks, and session recordings).
          These tools may set cookies or similar technologies. You can learn more
          in the{" "}
          <Link
            href="https://privacy.microsoft.com/privacystatement"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Privacy Statement
          </Link>
          .
        </p>
        <h2 className="title">How I Use the Info</h2>
        <p>Here&apos;s what I might do with any information I collect:</p>
        <ul>
          <li>Make sure the site is running smoothly</li>
          <li>Improve the website based on feedback you might share</li>
          <li>Respond to your questions or feedback</li>
        </ul>
        <h2 className="title">Sharing Your Info (Spoiler: I Don&apos;t)</h2>
        <p>
          I don&apos;t sell, trade, or rent your personal info. If you shared
          something sensitive by accident, feel free to reach out, and I&apos;ll
          help you remove it.
        </p>
        <h2 className="title">Security (The Internet Isn&apos;t Perfect)</h2>
        <p>
          I&apos;ll do my best to keep any info you share safe, but let&apos;s
          be real—no system is foolproof. While I&apos;ll take reasonable steps
          to protect your info, I can&apos;t promise 100% security.
        </p>
        <h2 className="title">Policy Updates (No Surprises)</h2>
        <p>
          This policy is current as of <b>{lastUpdated}</b>. If I make any
          changes, I&apos;ll update it here, so you&apos;re always in the loop.
          Feel free to check back occasionally, but don&apos;t worry—I&apos;m
          not making any big changes without letting you know.
        </p>
        <h2 className="title">Got Questions?</h2>
        <p>
          If you have any questions, concerns, or just want to say hi, drop me
          an email at{" "}
          <Link href="mailto:caesarisidrovaay@gmail.com">hello@gmail.com</Link> or use
          the <Link href="/contact">contact form</Link>. I&apos;d love to hear
          from you!
        </p>
      </div>
    </article>
  );
}
