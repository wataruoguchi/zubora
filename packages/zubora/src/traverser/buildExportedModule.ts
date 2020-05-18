import {
  Node,
  isIdentifier,
  isClassExpression,
  isClassDeclaration,
} from '@babel/types';
import { ExportedModule } from '../types';

/**
 * Create ExportedModule type object by given property and name, then return.
 * @param property name, 'default', or null
 * @param node
 */
function buildExportedModule(
  property: string | null,
  node: Node
): ExportedModule {
  if (isClassExpression(node) || isClassDeclaration(node)) {
    // e.g., module.exports = class Class { ... }
    // e.g., module.exports.named = class Class { ... }
    // e.g., module.exports.default = class Class { ... }
    // e.g., export default class Class { ... }
    // e.g., export class Class { ... }
    const classNameIfExists = isIdentifier(node.id) ? node.id.name : null;
    return {
      property,
      classNameIfExists,
      name: classNameIfExists,
    };
  } else if (isIdentifier(node)) {
    // e.g., function func() { ... }; module.exports.func = func;
    // e.g., class Class { ... }; module.exports = Class;
    // e.g., class Class { ... }; module.exports.named = Class;
    // e.g., class Class { ... }; module.exports.default = Class;
    // e.g., class Class { ... }; export default = Class;
    return {
      property,
      classNameIfExists: null,
      name: node.name,
    };
  } else {
    // e.g., module.exports = function () { ... }
    // e.g., module.exports.named = function () { ... }
    // e.g., module.exports.default = function () { ... }
    // e.g., export default function () { ... }
    // e.g., export function func() { ... }
    // e.g., function func() { ... }; export { func };
    // e.g., class Class { ... }; export { Class };
    return {
      property,
      classNameIfExists: null,
      name: null,
    };
  }
}

export { buildExportedModule };
