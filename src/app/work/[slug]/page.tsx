import { notFound } from "next/navigation";
import { Column } from "@once-ui-system/core";
import { getPosts } from "@/utils/utils";
import { Meta } from "@once-ui-system/core";
import {
  ProjectDetailView,
  ProjectRelatedHeading,
} from "@/components/work/ProjectDetailView";
import { ProjectMdxContent } from "@/components/work/ProjectMdxContent";
import { ProjectMdxLocaleSync } from "@/components/work/ProjectMdxLocaleSync";
import { Projects } from "@/components/work/Projects";
import { getDictionary, getServerLocale } from "@/i18n/server";
import { baseURL, work } from "@/resources";
import { Metadata } from "next";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "work", "projects"]);
  const post = posts.find((item) => item.slug === slugPath);
  if (!post) return {};

  const localized =
    dictionary.projects[slugPath as keyof typeof dictionary.projects] ?? null;

  return Meta.generate({
    title: localized?.title ?? post.metadata.title,
    description: localized?.summary ?? post.metadata.summary,
    baseURL: baseURL,
    image:
      post.metadata.image ||
      `/api/og/generate?title=${encodeURIComponent(localized?.title ?? post.metadata.title)}`,
    path: `${work.path}/${post.slug}`,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const post = getPosts(["src", "app", "work", "projects"]).find((item) => item.slug === slugPath);

  if (!post) {
    notFound();
  }

  return (
    <Column horizontal="center">
      <ProjectDetailView
        slug={post.slug}
        publishedAt={post.metadata.publishedAt}
        images={post.metadata.images}
        link={post.metadata.link}
        team={post.metadata.team}
      >
        <ProjectMdxLocaleSync />
        <ProjectMdxContent slug={post.slug} />
      </ProjectDetailView>
      <ProjectRelatedHeading />
      <Projects exclude={[post.slug]} range={[2]} />
    </Column>
  );
}
