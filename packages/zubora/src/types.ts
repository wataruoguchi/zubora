import { Node } from '@babel/types';

export type ExportedModule = {
  property: string | null;
  classNameIfExists: string | null;
  name: string | null;
  node?: Node;
};
export type MethodObject = {
  name: string | null;
  async: boolean;
  kind: string;
};
export type ClassObject = {
  name: string;
  methods: MethodObject[];
  isFunction?: boolean;
  identifierName?: string;
};
export type ParseResult = {
  exportedModules: ExportedModule[];
  classObjects: ClassObject[];
};
