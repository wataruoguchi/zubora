import React from 'react';
import AceEditor from 'react-ace';
require('ace-builds/src-noconflict/mode-json');
require('ace-builds/src-noconflict/mode-typescript');
require('ace-builds/src-noconflict/snippets/json');
require('ace-builds/src-noconflict/snippets/typescript');
require('ace-builds/src-noconflict/theme-monokai');

type ZuboraAceEditorProps = {
  placeholder: string;
  mode: string;
  value: string;
  height: string;
  width: string;
  onLoad?: () => void;
  onChange?: (value: string) => void;
  readOnly?: boolean;
};

const ZuboraAceEditor: React.FC<ZuboraAceEditorProps> = (
  props: ZuboraAceEditorProps
): React.ReactElement => {
  return (
    <AceEditor
      theme="monokai"
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      setOptions={{
        showLineNumbers: true,
        tabSize: 2,
      }}
      placeholder={props.placeholder}
      mode={props.mode}
      value={props.value}
      height={props.height}
      width={props.width}
      onLoad={props.onLoad}
      onChange={props.onLoad}
      readOnly={props.readOnly}
    />
  );
};
export { ZuboraAceEditor };
