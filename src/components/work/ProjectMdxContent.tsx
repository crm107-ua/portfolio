import { Column } from "@once-ui-system/core";
import { CustomMDX } from "@/components/mdx";
import { locales } from "@/i18n/config";
import { getAllDictionaries } from "@/i18n/dictionaries";

type ProjectMdxContentProps = {
  slug: string;
};

export function ProjectMdxContent({ slug }: ProjectMdxContentProps) {
  const dictionaries = getAllDictionaries();

  return (
    <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
      {locales.map((locale) => {
        const project =
          dictionaries[locale].projects[slug as keyof (typeof dictionaries)["en"]["projects"]];

        if (!project) return null;

        return (
          <div key={locale} data-project-locale={locale} hidden={locale !== "en"}>
            <CustomMDX source={project.body} />
          </div>
        );
      })}
    </Column>
  );
}
