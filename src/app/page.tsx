import { Column, RevealFx } from "@once-ui-system/core";
import { HomeView } from "@/components/home/HomeView";
import { Projects } from "@/components/work/Projects";
import { Meta } from "@once-ui-system/core";
import { getDictionary, getServerLocale } from "@/i18n/server";
import { baseURL, home } from "@/resources";

export async function generateMetadata() {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);

  return Meta.generate({
    title: dictionary.meta.home.title,
    description: dictionary.meta.home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <HomeView />
      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[1, 1]} />
      </RevealFx>
      <Projects range={[2]} />
    </Column>
  );
}
