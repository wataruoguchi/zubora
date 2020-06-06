import Head from 'next/head';
import React from 'react';
import { ZuboraApp } from '../src/components/zubora-app';
import { Nav } from '../src/components/nav';

const IndexPage: React.FC = (): React.ReactElement => {
  return (
    <div>
      <Head>
        <title>Zubora - Welcome, zubora hackers!</title>
        <link rel="icon" href="/favicon.ico" />
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
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
      `}</style>
    </div>
  );
};
export default IndexPage;
