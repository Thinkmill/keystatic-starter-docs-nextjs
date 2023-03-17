import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import invariant from "tiny-invariant";
import { PostProps } from ".";
import { useRouter } from "next/router";
import { Nav } from "@/components/Nav";

export default function App({
  Component,
  pageProps,
}: AppProps<{ pages: PostProps[] }>) {
  // invariant(pageProps.pages, "Please make sure to get pages on all pages");
  const { asPath } = useRouter();
  const { pages } = pageProps;
  return (
    <div
      className="max-w-7xl mx-auto grid md:h-screen grid-template text-neutral-900"
      key={asPath}
    >
      <Nav>
        <li>
          <Link href="/" className="block md:hover:opacity-75">
            Introduction
          </Link>
        </li>
        {pages &&
          pages.map(({ slug, title }) => {
            invariant(slug, "pages must have a slug");
            return (
              <li key={slug}>
                <Link href={slug} className="block md:hover:opacity-75">
                  {title}
                </Link>
              </li>
            );
          })}
      </Nav>
      <main className="overflow-auto px-6 md:px-9 py-32 md:pt-9 md:pb-20 w-full">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
