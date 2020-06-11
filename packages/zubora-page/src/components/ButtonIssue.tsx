import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { ZuboraStoreContext } from '../store/ZuboraStore';

type ButtonIssueProps = {
  version: string;
};
const ButtonIssue: React.FC<ButtonIssueProps> = observer(
  (props: ButtonIssueProps): React.ReactElement => {
    const zuboraStore = useContext(ZuboraStoreContext);
    const triplebackticks = '```';
    const body = `# New issue from playground

### Version:

zubora ${props.version}

### Code:

${triplebackticks}
${zuboraStore.code}
${triplebackticks}

### Result:

${triplebackticks}
${zuboraStore.result}
${triplebackticks}

### Expected behaviour:

`;
    const params = new URLSearchParams({ body });
    const issueUri = `https://github.com/wataruoguchi/zubora/issues/new?${params.toString()}`;
    return (
      <a
        aria-label="Report an issue."
        href={issueUri}
        target="_blank"
        rel="noreferrer"
        className="button"
      >
        Report issue
      </a>
    );
  }
);
export { ButtonIssue };
