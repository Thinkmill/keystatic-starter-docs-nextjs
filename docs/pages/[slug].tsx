import { createReader } from "@keystatic/core/reader";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import invariant from "tiny-invariant";

import { DocsContent } from "@/components/content";
import { inject } from "@/utils/slug-helpers";
import config from "../keystatic.config";

const reader = createReader("", config);

export type PostProps = InferGetStaticPropsType<
  typeof getStaticProps
>["pages"][number];

export default function Home({
  pages,
  slug,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const post = pages.find((el) => el.slug === slug);
  invariant(post, "Unable to match slug to post in array");

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.summary} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DocsContent>
        <div className="prose">
          {post.content && <DocumentRenderer document={post.content} />}
        </div>
      </DocsContent>
    </>
  );
}

export async function getStaticPaths(params: GetStaticPropsContext) {
  const pageslugs = await reader.collections.pages.list();
  const pages = await Promise.all(
    pageslugs.map(async (slug) => {
      const post = await inject(slug, reader.collections.pages);
      return { ...post };
    })
  );
  const paths = pages.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const [pageslugs] = await Promise.all([
    await reader.collections.pages.list(),
  ]);

  const [...pages] = await Promise.all([
    ...pageslugs.map(async (slug) => {
      const post = await inject(slug, reader.collections.pages);
      const content = (await post?.content()) || [];
      return { ...post, content };
    }),
  ]);

  return {
    props: {
      slug: context.params?.slug,
      pages: pages || {},
    },
  };
}
