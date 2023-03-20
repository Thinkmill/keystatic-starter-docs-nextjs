import { DocumentRenderer } from "@keystatic/core/renderer";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";

import { reader } from "@/utils/reader";
import { DocsContent } from "../components/content";
import { inject } from "@/utils/slug-helpers";

export type PostProps = InferGetStaticPropsType<
  typeof getStaticProps
>["pages"][number];

export default function Home({
  home,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Keystatic docs starter</title>
        <meta name="description" content="Create docs using keystatic" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DocsContent>
        <div className="prose">
          {home.content && <DocumentRenderer document={home.content} />}
        </div>
      </DocsContent>
    </>
  );
}

export async function getStaticProps() {
  const [pageslugs, index] = await Promise.all([
    await reader.collections.pages.list(),
    await reader.singletons.index.read(),
  ]);

  const [home, ...pages] = await Promise.all([
    { ...index, content: await index?.content() },
    ...pageslugs.map(async (slug) => {
      const post = await inject(slug, reader.collections.pages);
      const content = (await post?.content()) || [];
      return { ...post, content };
    }),
  ]);

  return {
    props: {
      home,
      pages: pages || {},
    },
  };
}
