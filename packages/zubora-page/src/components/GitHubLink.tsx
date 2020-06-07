import React from 'react';
const GitHubLink: React.FC = (): React.ReactElement => {
  return (
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
  );
};
export { GitHubLink };
