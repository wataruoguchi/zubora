import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Nav } from '../src/components/Nav';
import 'mobx-react-lite/batchingForReactDom';

const App: React.FC<AppProps> = (props: AppProps): React.ReactElement => {
  const { Component, pageProps } = props;
  const metaDesc = `Zubora is a JavaScript Unit Test File Generator for zubora ("lazy" in Japanese) developers.`;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const version = require('zubora/package.json').version;
  return (
    <div>
      <Head>
        <title>Zubora {version} - Welcome, zubora hackers!</title>
        <link rel="icon" href="/zubora.ico" />
        <meta name="og:site_name" content="Zubora" />
        <meta name="og:title" content="Zubora" />
        <meta name="description" content={metaDesc} />
        <meta name="og:description" content={metaDesc} />
        <meta name="og:type" content="website" />
        <meta name="og:image" content="/zubora_320x320.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="inspired"
          content="Inspired by https://prettier.io/playground/"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&family=Ubuntu+Mono&display=swap"
          rel="stylesheet"
        ></link>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-59923195-6"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-59923195-6');`,
          }}
        ></script>
      </Head>

      <Nav version={version} />
      <main className="container mx-auto min-w-full text-gray-900">
        <Component {...pageProps} />
      </main>
      <style jsx>{`
        main {
          min-height: calc(100vh - 64px);
        }
      `}</style>
      <style jsx global>{`
        @tailwind base;
        @tailwind components;
        @tailwind utilities;

        html,
        body {
          padding: 0;
          margin: 0;
          font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        .button {
          @apply inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white;
        }
        .button:hover {
          @apply border-transparent bg-white;
          color: #280c21;
        }
      `}</style>
    </div>
  );
};

export default App;
