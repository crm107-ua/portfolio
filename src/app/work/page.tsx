import { Column } from "@once-ui-system/core";
import { Meta } from "@once-ui-system/core";
import { WorkView } from "@/components/work/WorkView";
import { Projects } from "@/components/work/Projects";
import { getDictionary, getServerLocale } from "@/i18n/server";
import { baseURL, work } from "@/resources";

export async function generateMetadata() {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);

  return Meta.generate({
    title: dictionary.meta.work.title,
    description: dictionary.meta.work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(dictionary.meta.work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column maxWidth="m" horizontal="center">
      <WorkView />
      <Projects />
    </Column>
  );
}
