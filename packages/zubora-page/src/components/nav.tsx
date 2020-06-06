import React from 'react';

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
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          >
            Report issue
          </a>
        </div>
      </div>
    </nav>
  );
};
export { Nav };
