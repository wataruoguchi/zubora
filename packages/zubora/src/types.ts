export type ExportedModule = {
  property: string | null;
  classNameIfExists: string | null;
  name: string | null;
};
export type MethodObject = {
  name: string | null;
  async: boolean;
  kind: string;
};
export type ClassObject = {
  name: string;
  methods: MethodObject[];
};
export type ParseResult = {
  exportedModules: ExportedModule[];
  classObjects: ClassObject[];
};
