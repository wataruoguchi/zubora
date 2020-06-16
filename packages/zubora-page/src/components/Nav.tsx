import React from 'react';
import Link from 'next/link';
import { ButtonIssue } from './ButtonIssue';

type NavProps = {
  version: string;
};
const Nav: React.FC<NavProps> = (props: NavProps): React.ReactElement => {
  return (
    <nav className="flex items-center justify-between flex-wrap px-6 py-3 text-white">
      <div className="flex items-center flex-shrink-0 mr-6">
        <Link href="/">
          <a>
            <img src="/Zubora.svg" className="w-10 mx-3" />
          </a>
        </Link>
        <Link href="/">
          <a>
            <span className="font-semibold text-xl tracking-wider">Zubora</span>
          </a>
        </Link>
        <span className="ml-3 pt-2 text-xs opacity-75">v {props.version}</span>
      </div>
      <div className="block flex-grow md:flex lg:flex md:items-center lg:items-center md:w-auto lg:w-auto">
        <div className="text-md md:flex-grow lg:flex-grow">
          <Link href="/playground">
            <a
              className="block md:inline-block lg:inline-block hover:underline mr-4"
              cy-data="nav-playground"
            >
              Playground
            </a>
          </Link>
        </div>
        <div className="mr-3">
          <a
            aria-label="Go to the GitHub repository."
            href="https://github.com/wataruoguchi/zubora"
            target="_blank"
            rel="noreferrer"
            className="font-hairline hover:underline"
          >
            GitHub
          </a>
        </div>
        <div className="mr-3">
          <a
            aria-label="Download the CLI tool."
            href="https://www.npmjs.com/package/zubora-cli"
            target="_blank"
            rel="noreferrer"
            className="font-hairline hover:underline"
          >
            Install CLI
          </a>
        </div>
        <div>
          <ButtonIssue version={props.version} />
        </div>
      </div>
      <style jsx>{`
        nav {
          background-color: #280c21;
        }
      `}</style>
    </nav>
  );
};
export { Nav };
