import { Column, Meta, Schema } from "@once-ui-system/core";
import { ContactForm } from "@/components/contact/ContactForm";
import { getDictionary, getServerLocale } from "@/i18n/server";
import { about, baseURL, contact, person } from "@/resources";

export async function generateMetadata() {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);

  return Meta.generate({
    title: dictionary.meta.contact.title,
    description: dictionary.meta.contact.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(dictionary.meta.contact.title)}`,
    path: contact.path,
  });
}

export default function ContactPage() {
  return (
    <Column maxWidth="l" paddingTop="24" paddingX="l" horizontal="center" fillWidth>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={contact.path}
        title={contact.title}
        description={contact.description}
        image={`/api/og/generate?title=${encodeURIComponent(contact.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <ContactForm />
    </Column>
  );
}
