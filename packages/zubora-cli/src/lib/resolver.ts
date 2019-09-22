import * as path from 'path';
export function getRelativePath(src: string, dest: string): string {
  // Calculate the relative import source path for the test file from given source file path and test destination file path.
  const { dir } = path.parse(dest);
  const relative = path.relative(dir, src);
  return relative.includes('./') ? relative : `./${relative}`;
}
export function getFileName(filePath: string): string {
  const { name } = path.parse(filePath);
  return name;
}
