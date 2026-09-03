"use client";

import { ProjectCard } from "@/components/ProjectCard";
import { ProjectSeparator } from "./ProjectSeparator";

export type ProjectListItem = {
  slug: string;
  href: string;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
};

type ProjectsListProps = {
  posts: ProjectListItem[];
  showSeparators?: boolean;
};

export function ProjectsList({ posts, showSeparators = false }: ProjectsListProps) {
  return (
    <>
      {posts.map((post, index) => (
        <div key={post.slug}>
          {showSeparators && index > 0 ? <ProjectSeparator /> : null}
          <ProjectCard
            priority={index < 2}
            slug={post.slug}
            href={post.href}
            images={post.images}
            title={post.title}
            description={post.description}
            content={post.content}
            avatars={post.avatars}
            link={post.link}
          />
        </div>
      ))}
    </>
  );
}
