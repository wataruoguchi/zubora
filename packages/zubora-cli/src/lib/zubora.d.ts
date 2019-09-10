export type ModuleExportObject = {
  property?: string;
  name: string | null;
};
export type MethodObject = {
  async?: boolean;
  name: string | null;
};
export type ClassObject = {
  name: string;
  methods: MethodObject[];
};
export type ParseResult = {
  exposedNames: ModuleExportObject[];
  classObjects: ClassObject[];
};
