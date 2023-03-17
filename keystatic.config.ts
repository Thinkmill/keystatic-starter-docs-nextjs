import {
  collection,
  config,
  fields,
  // GitHubConfig,
  // LocalConfig,
  singleton,
} from "@keystatic/core";

// const storage: LocalConfig["storage"] | GitHubConfig["storage"] =
//   process.env.NODE_ENV === "development"
//     ? { kind: "local" }
//     : {
//         kind: "github",
//         repo: {
//           owner: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER!,
//           name: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG!,
//         },
//       };

export default config({
  storage: { kind: "local" },
  singletons: {
    index: singleton({
      label: "Introduction",
      path: "content/singletons/index/",
      schema: {
        content: fields.document({
          label: "Content",
          formatting: true,
        }),
      },
    }),
  },
  collections: {
    pages: collection({
      label: "Pages",
      path: "content/pages/*/",
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
        images: fields.array({
          ...fields.object({
            image: fields.image({ label: "Image", directory: "public" }),
            alt: fields.text({ label: "Alt text" }),
          }),
        }),
        content: fields.document({
          label: "Content",
          formatting: true,
        }),
      },
    }),
  },
});
