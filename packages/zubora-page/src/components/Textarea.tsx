import React from 'react';
type TextareaProps = {
  placeholder?: string;
  value?: string;
  handleOnChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
};
const Textarea: React.FC<TextareaProps> = (
  props: TextareaProps
): React.ReactElement => (
  <textarea
    className="h-64 w-full border-solid border border-gray-700 rounded-sm"
    placeholder={props.placeholder}
    onChange={props.handleOnChange}
    defaultValue={props.value}
    disabled={props.disabled}
  ></textarea>
);
export { Textarea };
