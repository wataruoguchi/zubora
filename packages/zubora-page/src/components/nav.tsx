import React from 'react';
import { ButtonIssue } from './ButtonIssue';

const Nav: React.FC = (): React.ReactElement => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-600 px-6 py-3">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Zubora</span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow"></div>
        <div className="mr-3">
          <a
            href="https://github.com/wataruoguchi/zubora"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/GitHub-Mark-64px.png"
              alt="GitHub logo"
              className="flex px-2 py-1 object-scale-down w-8"
            />
          </a>
        </div>
        <div>
          <ButtonIssue />
        </div>
      </div>
    </nav>
  );
};
export { Nav };
