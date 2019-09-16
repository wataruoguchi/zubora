export type ModuleExportObject = {
  property?: string;
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
  exposedNames: ModuleExportObject[];
  classObjects: ClassObject[];
};
