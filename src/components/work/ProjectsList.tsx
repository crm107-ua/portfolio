"use client";

import { ProjectCard } from "@/components/ProjectCard";

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
};

export function ProjectsList({ posts }: ProjectsListProps) {
  return (
    <>
      {posts.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          slug={post.slug}
          href={post.href}
          images={post.images}
          title={post.title}
          description={post.description}
          content={post.content}
          avatars={post.avatars}
          link={post.link}
        />
      ))}
    </>
  );
}
