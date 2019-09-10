import { parseScript } from 'esprima'
import {
  Node,
  Identifier,
  ExpressionStatement,
  AssignmentExpression,
  MemberExpression,
  ClassDeclaration,
  MethodDefinition,
  FunctionExpression
} from 'estree'
import * as prettier from 'prettier'

type methodObject = {
  async?: boolean;
  name: string;
}
type ClassObject = {
  name: string;
  methods: methodObject[];
}

function getModuleExportsName(node: Node): { name: string | null } {
  const invalidReturnValue = { name: null }
  const expression = (node as ExpressionStatement)
    .expression as AssignmentExpression
  if (expression === undefined) return invalidReturnValue
  const left = expression.left as MemberExpression
  if (left === undefined) return invalidReturnValue
  const right = expression.right as Identifier
  if (right === undefined) return invalidReturnValue
  if (
    left.object.type === 'Identifier' &&
    left.object.name === 'module' &&
    left.property.type === 'Identifier' &&
    left.property.name === 'exports' &&
    right.type === 'Identifier'
  ) {
    return { name: right.name }
  }
  return invalidReturnValue
}

function getClassObject(node: Node): { classObject: ClassObject | null } {
  const invalidReturnValue = { classObject: null }
  const type = (node as ClassDeclaration).type as string
  if (type !== 'ClassDeclaration') return invalidReturnValue
  const id = (node as ClassDeclaration).id as Identifier
  if (id === undefined) return invalidReturnValue
  const classObject = { name: '' as string, methods: [] as methodObject[] }
  if (id.type === 'Identifier' && id.name) classObject.name = id.name
  const body = (node as ClassDeclaration).body.body
  classObject.methods = body
    .filter(
      bodyNode =>
        bodyNode.type === 'MethodDefinition' &&
        ((bodyNode as MethodDefinition).key as Identifier) !== undefined
    )
    .map(bodyNode => {
      const key = (bodyNode as MethodDefinition).key as Identifier
      const value = (bodyNode as MethodDefinition).value as FunctionExpression
      return {
        async: value.async,
        name: key.name
      }
    })
  return { classObject }
}

function generateTemplate(
  path: string,
  exposedNames: string[],
  classes: ClassObject[]
): string {
  const classesHash = classes.reduce((acc: any, classObj: ClassObject) => {
    // any ? How can I define?
    if (!acc[classObj.name]) acc[classObj.name] = classObj
    return acc
  }, {})
  const imports = exposedNames
    .map(name => `import ${name} from "${path}"`)
    .join('\n')
  const describes = exposedNames
    .map((name: string) => {
      const classObj: ClassObject = classesHash[name]
      let classTestStr = ''
      if (classObj) {
        classTestStr =
          `describe("${classObj.name}",function(){\n` +
          classObj.methods
            .map((method: methodObject) => {
              return `it("#${method.name}", ${
                method.async ? 'async' : ''
              } function(){\n// TODO ${name}#${method.name}\n})`
            })
            .join('\n') +
          `\n})`
      }
      return classTestStr
    })
    .join('\n')
  return prettier.format(`
    ${imports}\n
    ${describes}
  `)
}

function parse(path: string, jsContent: string): string {
  const structure = parseScript(jsContent, { tolerant: true })
  const exposedNames: string[] = []
  const classes: ClassObject[] = []
  function parseModuleExportsName(node: Node) {
    const { name } = getModuleExportsName(node)
    if (name) {
      exposedNames.push(name)
    }
  }
  function parseClassObject(node: Node) {
    const { classObject } = getClassObject(node)
    if (classObject) {
      classes.push(classObject)
    }
  }
  for (const node of structure.body) {
    parseModuleExportsName(node)
    parseClassObject(node)
  }
  return generateTemplate(path, exposedNames, classes)
}

export { parse }
