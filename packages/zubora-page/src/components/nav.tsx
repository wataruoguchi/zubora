import React from 'react';
import { ButtonIssue } from './ButtonIssue';

type NavProps = {
  version: string;
};
const Nav: React.FC<NavProps> = (props: NavProps): React.ReactElement => {
  return (
    <nav className="flex items-center justify-between flex-wrap px-6 py-3 text-white">
      <div className="flex items-center flex-shrink-0 mr-6">
        <img src="/Zubora.svg" className="w-10 mx-3" />
        <span className="font-semibold text-xl tracking-wider">Zubora</span>
        <span className="ml-3 pt-1 text-sm opacity-75">v {props.version}</span>
      </div>
      <div className="block flex-grow flex items-center w-auto">
        <div className="text-sm flex-grow"></div>
        <div className="mr-3">
          <a
            href="https://github.com/wataruoguchi/zubora"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa fa-github text-xl pt-1"></i>
          </a>
        </div>
        <div className="mr-3">
          <a
            href="https://www.npmjs.com/package/zubora-cli"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa fa-download text-xl pt-1"></i>
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
