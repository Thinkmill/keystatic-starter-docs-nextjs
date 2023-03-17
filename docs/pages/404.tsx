import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.config";
import { inject } from "@/utils/slugHelpers";

const reader = createReader("", config);

const notFound = () => {
  return (
    <>
      <h1>404</h1>
      <h2>This page could not be found</h2>
    </>
  );
};

export async function getStaticProps() {
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
      pages: pages || {},
    },
  };
}

export default notFound;
