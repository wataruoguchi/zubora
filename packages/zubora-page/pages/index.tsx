import Head from 'next/head';
import React from 'react';
import { ZuboraApp } from '../src/components/ZuboraApp';

const IndexPage: React.FC = (): React.ReactElement => {
  return (
    <div>
      <Head>
        <title>Zubora - Welcome, zubora hackers!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto min-h-screen text-gray-900">
        <h1 className="text-center text-2xl mt-5 mb-2">Zubora</h1>

        <p className="text-center text-xl">
          Welcome, zubora (&quot;lazy&quot; in Japanese) hackers!
        </p>
        <div className="container my-8 p-3 bg-gray-200 rounded-sm leading-relaxed font-light">
          <p>
            Zubora is a JavaScript / TypeScript Test File Generator for lazy
            developers. It generates unit test template to encourage zubora
            developers to write tests.
          </p>
          <p>
            Read more / Download the CLI via&nbsp;
            <a
              href="https://www.npmjs.com/package/zubora-cli"
              target="_blank"
              rel="noreferrer"
              className="underline font-normal"
            >
              npm
            </a>
            !
          </p>
        </div>

        <ZuboraApp></ZuboraApp>
      </main>

      <footer className="bg-gray-100">
        <div className="container mx-auto px-6 pt-0 pb-6">
          <div className="text-center">
            <a
              href="https://github.com/wataruoguchi/zubora"
              target="_blank"
              rel="noreferrer"
              className="item-center leading-none flex lg:inline-flex"
            >
              <img
                src="/GitHub-Mark-64px.png"
                alt="GitHub logo"
                className="flex px-2 py-1 mr-1 object-scale-down w-8"
              />
              <span className="flex-auto text-left leading-normal underline">
                https://github.com/wataruoguchi/zubora
              </span>
            </a>
          </div>
        </div>
      </footer>

      <style jsx>{``}</style>

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