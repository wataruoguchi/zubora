import { parseScript, Program } from 'esprima';
import {
  ModuleExportObject,
  MethodObject,
  ClassObject,
  ParseResult,
} from './zubora';
import {
  Node,
  Identifier,
  ExpressionStatement,
  AssignmentExpression,
  MemberExpression,
  ClassDeclaration,
  MethodDefinition,
  FunctionExpression,
  Statement,
  Expression,
  Super,
} from 'estree';

function isFunctionExpression(exp: Node): exp is FunctionExpression {
  return exp.type === 'FunctionExpression';
}
function isMemberExpression(exp: Node): exp is MemberExpression {
  return exp.type === 'MemberExpression';
}
function isAssignmentExpression(exp: Expression): exp is AssignmentExpression {
  return exp.type === 'AssignmentExpression';
}
function isIdentifier(exp: Expression | Super): exp is Identifier {
  return exp.type === 'Identifier';
}
function isExpressionStatement(exp: Statement): exp is ExpressionStatement {
  return exp.type === 'ExpressionStatement';
}
function isMethodDefinition(exp: MethodDefinition): exp is MethodDefinition {
  return exp.type === 'MethodDefinition';
}
function isClassDeclaration(exp: ClassDeclaration): exp is ClassDeclaration {
  return exp.type === 'ClassDeclaration';
}

function flattenMemberExpression(exp: MemberExpression): string {
  if (!exp) return '';
  const { object } = exp;
  const property: Identifier = exp.property as Identifier;
  if (isMemberExpression(object)) {
    return flattenMemberExpression(object) + `.${property.name}`;
  } else if (isIdentifier(object)) {
    return `${object.name}.${property.name}`;
  } else {
    return '';
  }
}

function getModuleExportsName(node: ExpressionStatement): ModuleExportObject {
  if (
    isExpressionStatement(node) &&
    isAssignmentExpression(node.expression) &&
    isMemberExpression(node.expression.left) &&
    isIdentifier(node.expression.left.object) &&
    isIdentifier(node.expression.left.property) &&
    isIdentifier(node.expression.right)
  ) {
    const { left, right } = node.expression;
    if (flattenMemberExpression(left).match(/^module.exports\.?(.*)$/)) {
      return { name: right.name, property: RegExp.$1 };
    } else {
      return { name: null };
    }
  }
  return { name: null };
}

function getClassObject(
  node: ClassDeclaration
): { classObject: ClassObject | null } {
  if (isClassDeclaration(node) && node.id && isIdentifier(node.id)) {
    const {
      id: { name },
    } = node;
    const classObject = { name, methods: [] as MethodObject[] };
    const { body } = node.body;
    const methodObjects = body
      .filter(
        (bodyNode): boolean =>
          isMethodDefinition(bodyNode) &&
          isIdentifier(bodyNode.key) &&
          isFunctionExpression(bodyNode.value)
      )
      .map(
        (bodyNode): MethodObject => {
          const name = isIdentifier(bodyNode.key) ? bodyNode.key.name : null;
          const {
            value: { async },
          } = bodyNode;
          return {
            async,
            name,
          };
        }
      );
    classObject.methods.push(...methodObjects);
    return { classObject };
  } else {
    return { classObject: null };
  }
}

function parse(jsContent: string): ParseResult {
  const exposedNames: ModuleExportObject[] = [];
  const classObjects: ClassObject[] = [];
  function parseModuleExports(node: ExpressionStatement): void {
    const { name, property } = getModuleExportsName(node);
    if (name) {
      exposedNames.push({ name, property });
    }
  }
  function parseClassObjects(node: ClassDeclaration): void {
    const { classObject } = getClassObject(node);
    if (classObject) {
      classObjects.push(classObject);
    }
  }

  const structure: Program = parseScript(jsContent, { tolerant: true });
  for (const node of structure.body) {
    parseModuleExports(node as ExpressionStatement);
    parseClassObjects(node as ClassDeclaration);
  }
  // Return collected objects
  return { exposedNames, classObjects };
}

export { parse };
