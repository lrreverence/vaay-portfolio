"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

interface TechItem {
  name: string;
  icon: string;
  lightIcon?: string;
}

const techStack: TechItem[] = [
  {
    name: "React",
    icon: "/tech/react.svg",
  },
  {
    name: "Next.js",
    icon: "/tech/nextjs.svg",
    lightIcon: "/tech/nextjslight.svg",
  },
  {
    name: "TypeScript",
    icon: "/tech/typescript.svg",
  },
  {
    name: "Node.js",
    icon: "/tech/nodejs.svg",
  },
  {
    name: "Docker",
    icon: "/tech/docker.svg",
  },
  {
    name: "Kubernetes",
    icon: "/tech/kubernetes.svg",
  },
  {
    name: "Python",
    icon: "/tech/python.svg",
  },
  {
    name: "PHP",
    icon: "/tech/php.svg",
  },
  {
    name: "Laravel",
    icon: "/tech/laravel.svg",
  },
  {
    name: "JavaScript",
    icon: "/tech/javascript.svg",
  },
  {
    name: "Tailwind CSS",
    icon: "/tech/tailwind.svg",
  },
  {
    name: "MongoDB",
    icon: "/tech/mongodb.svg",
  },
  {
    name: "PostgreSQL",
    icon: "/tech/postgresql.svg",
  },
  {
    name: "Java",
    icon: "/tech/java.svg",
  },
  {
    name: "Firebase",
    icon: "/tech/firebase.svg",
  },
  {
    name: "C/C++",
    icon: "/tech/cpp1.svg",
  },
  {
    name: "SQL",
    icon: "/tech/sql.svg",
  },
  {
    name: "HTML/CSS",
    icon: "/tech/htmlcss.svg",
  },
  {
    name: "Vue.js",
    icon: "/tech/vue.svg",
  },
  {
    name: "Django",
    icon: "/tech/django.svg",
  },
  {
    name: "Angular",
    icon: "/tech/angular.svg",
  },
  {
    name: "WordPress",
    icon: "/tech/wordpress.svg",
  },
  {
    name: "Zapier",
    icon: "/tech/zapier.svg",
  },
  {
    name: "n8n",
    icon: "/tech/n8n.svg",
  },
  {
    name: "GoHighLevel",
    icon: "/tech/GHL.jpeg",
  },
];

export default function TechStack() {
  const { resolvedTheme } = useTheme();

  return (
    <section className="flex flex-col gap-8">
      <h2 className="title text-2xl sm:text-3xl">tech stack</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {techStack.map((tech) => (
          <div
            key={tech.name}
            className="flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors hover:bg-muted"
          >
            <Image
              src={tech.lightIcon && resolvedTheme === "light" ? tech.lightIcon : tech.icon}
              alt={tech.name}
              width={40}
              height={40}
              className="size-10"
              unoptimized={tech.icon.includes('.jpeg') || tech.icon.includes('.jpg')}
            />
            <span className="text-sm font-medium">{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
} 