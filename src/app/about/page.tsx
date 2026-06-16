import { Meta } from "@once-ui-system/core";
import { AboutView } from "@/components/about/AboutView";
import { getDictionary, getServerLocale } from "@/i18n/server";
import { baseURL, about } from "@/resources";

export async function generateMetadata() {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);

  return Meta.generate({
    title: dictionary.meta.about.title,
    description: dictionary.meta.about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(dictionary.meta.about.title)}`,
    path: about.path,
  });
}

export default function About() {
  return <AboutView />;
}
