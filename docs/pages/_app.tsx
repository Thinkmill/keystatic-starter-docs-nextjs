import "@/styles/globals.css";
import { injectVoussoirStyles } from "@voussoir/core";
import { SSRProvider } from "@voussoir/ssr";
import type { AppProps } from "next/app";

import { Layout } from "@/components/layout";
import { PostProps } from ".";
import { SidebarItem } from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-switcher";
import { UniversalNextLink } from "@/components/universal-next-link";

const singletons = [
  {
    name: "Introduction",
    href: "/",
  },
];

injectVoussoirStyles();

export default function App({
  Component,
  pageProps,
}: AppProps<{ pages: PostProps[] }>) {
  const { pages } = pageProps;
  const pagesNav =
    pages?.reduce((prev, curr) => {
      // if the page is not "published" do not add it to the navigation
      if (!curr.publishedDate) return prev;

      const navigationItem = {
        name: curr.title,
        href: curr.slug,
      };
      return [navigationItem, ...prev];
    }, []) || [];

  const navigation = [
    ...singletons,
    {
      name: "Components",
      children: pagesNav,
    },
  ];
  return (
    <SSRProvider>
      <ThemeProvider linkComponent={UniversalNextLink}>
        <Layout navigation={navigation as SidebarItem[]}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SSRProvider>
  );
}
