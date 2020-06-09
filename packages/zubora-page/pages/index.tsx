import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import * as fs from 'fs';
import * as path from 'path';
import { ZuboraApp } from '../src/components/ZuboraApp';
import { Nav } from '../src/components/Nav';
import 'mobx-react-lite/batchingForReactDom';

type IndexPageProps = {
  version: string;
};
const IndexPage: React.FC<IndexPageProps> = (
  props: IndexPageProps
): React.ReactElement => {
  const metaDesc = `Zubora is a JavaScript Unit Test File Generator for zubora ("lazy" in Japanese) developers.`;
  return (
    <div>
      <Head>
        <title>Zubora {props.version} - Welcome, zubora hackers!</title>
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
        <meta name="awesome" content="Icons by https://fontawesome.com/" />
        <link
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
          integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
          crossOrigin="anonymous"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&family=Ubuntu+Mono&display=swap"
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

      <Nav version={props.version} />
      <main className="container mx-auto min-w-full text-gray-900">
        <ZuboraApp />
      </main>
      <style jsx>{`
        main {
          min-height: calc(100vh - 56px);
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
      `}</style>
    </div>
  );
};

export default IndexPage;
export const getStaticProps: GetStaticProps = async () => {
  // Getting the current zubora version from the file.
  const version = fs.readFileSync(
    path.join(process.cwd(), '/public/zubora-version'),
    'utf8'
  );
  return {
    props: {
      version,
    },
  };
};
