import Head from 'next/head';
import React from 'react';
import { ZuboraApp } from '../src/components/ZuboraApp';
import { Nav } from '../src/components/Nav';
import 'mobx-react-lite/batchingForReactDom';

const IndexPage: React.FC = (): React.ReactElement => {
  return (
    <div>
      <Head>
        <title>Zubora - Welcome, zubora hackers!</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&family=Ubuntu+Mono&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <Nav />
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
