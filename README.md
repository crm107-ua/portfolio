# Carlos Robles — Portfolio

Personal portfolio of **Carlos Robles**, Full-Stack & AI Engineer based in Alicante, Spain.

**Live:** [carlosrobles.es](https://carlosrobles.es)

## About

Production web products — SaaS, platforms, and community tools — built with modern stacks and AI-assisted development. From Symfony and Next.js to local LLMs and RAG.

- [GitHub](https://github.com/crm107-ua)
- [LinkedIn](https://www.linkedin.com/in/carlos-robles-94105b159/)
- [Email](mailto:caromamusic@gmail.com)

## Stack

- [Next.js](https://nextjs.org) 16 + TypeScript
- [Once UI](https://once-ui.com) / [Magic Portfolio](https://github.com/once-ui-system/magic-portfolio) template
- MDX for project case studies
- Dark mode by default

## Local development

**Requirements:** Node.js 18.17+

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve production build
```

## Project structure

| Path | Purpose |
|------|---------|
| `src/resources/content.tsx` | Bio, home, about, skills, social links |
| `src/resources/once-ui.config.ts` | Theme, routes, SEO base URL |
| `src/app/work/projects/*.mdx` | Project case studies |
| `public/images/projects/{slug}/` | Project screenshots |
| `public/images/avatar.png` | Profile photo |

### Add a project

1. Create `src/app/work/projects/my-project.mdx` (duplicate an existing file).
2. Edit frontmatter: `title`, `summary`, `publishedAt`, `link`.
3. Add images to `public/images/projects/my-project/`:
   - `my-project.png` — main screenshot
   - `my-project-2.png`, `my-project-3.png` — extra tabs (auto-detected)

### Add project images

Drop files in `public/images/projects/{slug}/` using this naming:

```
{slug}.png
{slug}-2.png
{slug}-3.png
```

Supported formats: `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`, `.avif`. No need to list them in the MDX frontmatter.

## Featured projects

- [Warera](https://warera.es/preview) — Web OS for gaming communities
- [Olvida](https://olvida.es/) — Digital footprint reduction platform
- [eBISU](https://ebisu.carlosrobles.es) — Sales & payments SaaS
- [Lesly](https://lesly-app.carlosrobles.es) — Live concert streaming
- [TusOfertasDeHoy](https://tusofertasdehoy.es) — Daily deals aggregator

## Template credits

Built on [Magic Portfolio](https://github.com/once-ui-system/magic-portfolio) by [Once UI](https://once-ui.com).  
Template docs: [docs.once-ui.com](https://docs.once-ui.com/docs/magic-portfolio/quick-start)

## License

Portfolio content © Carlos Robles.  
Template distributed under [CC BY-NC 4.0](LICENSE.txt) (Once UI / Magic Portfolio).
