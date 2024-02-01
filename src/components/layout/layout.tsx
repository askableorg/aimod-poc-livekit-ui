import Head from "next/head";

import { useAppConfig } from "@/hooks/useAppConfig";


export const Layout = ({ children }: { children: React.ReactNode }) => {
  const appConfig = useAppConfig();
  return (
    <>
      <Head>
        <title>AI-Moderated Demo</title>
        <meta
          name="description"
          content={
            appConfig?.description ??
            "Quickly prototype and test your multimodal agents"
          }
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative flex flex-col justify-center px-4 items-center h-full w-full bg-black repeating-square-background">
        {children}
      </main>
    </>
  );
};
