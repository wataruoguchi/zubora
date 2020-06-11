import React from 'react';
import Link from 'next/link';
import Hero from '../src/components/Hero';

const IndexPage: React.FC = (): React.ReactElement => {
  return (
    <div>
      <Hero />
      <div className="container mx-auto max-width-limited mb-20">
        <h1 className="text-6xl text-center py-5">Zubora</h1>
        <h2 className="h2">What is Zubora?</h2>
        <p className="p">
          Zubora is a JavaScript Unit Test File Generator. It is made for zubora
          (&quot;lazy&quot; in Japanese) developers. It reads your
          JavaScript/TypeScript modules and automatically generates unit test
          templates for you.
        </p>
        <p className="p">
          Try it in{' '}
          <Link href="/playground">
            <a>playground</a>
          </Link>
          !
        </p>
        <p className="p">Currently, we support the following languages:</p>
        <ul className="ul py-5 list-inside list-disc">
          <li>JavaScript</li>
          <li>TypeScript</li>
        </ul>
        <p className="p">
          We also provide a plugin for{' '}
          <a
            href="https://www.npmjs.com/package/zubora-cli"
            aria-label="Install the plugin for CoffeeScript."
            target="_blank"
            rel="noreferrer"
          >
            CoffeeScript
          </a>{' '}
          that works with{' '}
          <a aria-label="Install the CLI." target="_blank" rel="noreferrer">
            zubora-cli
          </a>
          .
        </p>
        <h2 className="h2">Why Zubora?</h2>
        <p className="p">
          <strong className="text-xl">Bootstrap writing tests: </strong>There
          are tons of modules that have zero tests. You, and other developers,
          have to maintain those modules with fear. Zubora encourages developers
          to write tests by creating test templates.
        </p>
        <blockquote className="border-l-4 text-3xl my-8 py-3 pl-5 text-gray-700">
          Code as it’s going to be abandoned anytime soon, write test otherwise.
        </blockquote>
        <h2 className="h2">How to use</h2>
        <p className="p">
          Try it in{' '}
          <Link href="/playground">
            <a>playground</a>
          </Link>
          . Then install{' '}
          <a
            href="https://www.npmjs.com/package/zubora-cli"
            aria-label="Install the plugin for CoffeeScript."
            target="_blank"
            rel="noreferrer"
          >
            zubora-cli
          </a>{' '}
          in your dev environment.
        </p>
        <h2 className="h2">Special Thanks</h2>
        <p className="p">
          Huge thanks to my partner for drawing me the zubora sloth, and
          supporting me always.
        </p>
      </div>
      <style jsx>{`
        .max-width-limited {
          max-width: 768px;
        }
        .h2 {
          @apply text-3xl py-4;
        }
        .ul,
        .p {
          @apply py-2;
          font-size: 16px;
        }
        a {
          color: #de852c;
          cursor: pointer;
        }
        a:hover {
          color: #93581d;
        }
      `}</style>
    </div>
  );
};

export default IndexPage;
