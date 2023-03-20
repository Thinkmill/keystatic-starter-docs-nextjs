import {
  collection,
  config,
  fields,
  GitHubConfig,
  LocalConfig,
  singleton,
} from "@keystatic/core";

const storage: LocalConfig["storage"] | GitHubConfig["storage"] =
  process.env.NODE_ENV === "development"
    ? { kind: "local" }
    : {
        kind: "github",
        repo: {
          owner: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER!,
          name: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG!,
        },
      };

export default config({
  storage,
  singletons: {
    index: singleton({
      label: "Introduction",
      path: "docs/content/singletons/index/",
      schema: {
        content: fields.document({
          label: "Content",
          formatting: true,
        }),
      },
    }),
  },
  collections: {
    components: collection({
      label: "Components",
      path: "packages/*/docs",
      slugField: "title",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            validation: {
              length: {
                min: 1,
              },
            },
          },
        }),
        content: fields.document({
          label: "Content",
          formatting: true,
        }),
      },
    }),
    pages: collection({
      label: "Pages",
      path: "docs/content/pages/*/",
      slugField: "title",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            validation: {
              length: {
                min: 1,
              },
            },
          },
        }),
        summary: fields.text({
          label: "Summary",
          validation: { length: { min: 4 } },
        }),
        publishedDate: fields.date({ label: "Published Date" }),
        content: fields.document({
          label: "Content",
          formatting: true,
        }),
      },
    }),
  },
});
