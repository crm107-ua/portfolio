import { Column, Meta, Schema } from "@once-ui-system/core";
import { CvViewer } from "@/components/cv/CvViewer";
import { getDictionary, getServerLocale } from "@/i18n/server";
import { about, baseURL, cv, person } from "@/resources";

export async function generateMetadata() {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);

  return Meta.generate({
    title: dictionary.meta.cv.title,
    description: dictionary.meta.cv.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(dictionary.meta.cv.title)}`,
    path: cv.path,
  });
}

export default function CvPage() {
  return (
    <Column maxWidth="l" paddingTop="24" paddingX="l" horizontal="center" fillWidth>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={cv.path}
        title={cv.title}
        description={cv.description}
        image={`/api/og/generate?title=${encodeURIComponent(cv.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <CvViewer />
    </Column>
  );
}
