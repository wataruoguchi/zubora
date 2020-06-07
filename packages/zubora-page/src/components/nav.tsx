import React from 'react';
import { ButtonIssue } from './ButtonIssue';
import { GitHubLink } from './GitHubLink';

const Nav: React.FC = (): React.ReactElement => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-600 px-6 py-3">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Zubora</span>
      </div>
      <div className="block flex-grow flex items-center w-auto">
        <div className="text-sm flex-grow"></div>
        <div className="mr-3">
          <GitHubLink />
        </div>
        <div>
          <ButtonIssue />
        </div>
      </div>
    </nav>
  );
};
export { Nav };
