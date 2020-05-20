"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("@babel/types");
var buildExportedModule_1 = require("./buildExportedModule");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function classDeclaration(declaration) {
    if (types_1.isClassDeclaration(declaration) && types_1.isIdentifier(declaration.id)) {
        return [declaration.id.name];
    }
    return null;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function variableDeclaration(declaration) {
    if (types_1.isVariableDeclaration(declaration) && declaration.declarations) {
        var variableDeclarators = declaration.declarations;
        return variableDeclarators.reduce(function (names, declaration) {
            if (types_1.isIdentifier(declaration.id)) {
                names.push(declaration.id.name);
            }
            if (types_1.isObjectPattern(declaration.id)) {
                var objectPattern = declaration.id;
                var propNames = objectPattern.properties.reduce(function (propNames, node) {
                    if (types_1.isObjectProperty(node)) {
                        propNames.push(node.key.name);
                    }
                    return propNames;
                }, []);
                names.push.apply(names, propNames);
            }
            return names;
        }, []);
    }
    return null;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function functionDeclaration(declaration) {
    if (types_1.isFunctionDeclaration(declaration) && types_1.isIdentifier(declaration.id)) {
        return [declaration.id.name];
    }
    return null;
}
function visitExportNamedDeclaration(exportedModules) {
    return function (path) {
        var node = path.node;
        var declaration = node.declaration;
        var names = classDeclaration(declaration) ||
            variableDeclaration(declaration) ||
            functionDeclaration(declaration);
        if (names) {
            names.forEach(function (name) {
                var moduleExportObject = buildExportedModule_1.buildExportedModule(name, declaration);
                exportedModules.push(moduleExportObject);
            });
        }
        else if (declaration === null &&
            node.specifiers &&
            node.specifiers.length > 0 &&
            node.specifiers.every(function (specifier) {
                return types_1.isExportSpecifier(specifier) && types_1.isIdentifier(specifier.exported);
            })) {
            node.specifiers.map(function (specifier) {
                var name = specifier.exported.name;
                var moduleExportObject = buildExportedModule_1.buildExportedModule(name, node // declaration must be null, let's pass the node to avoid the type error
                );
                exportedModules.push(moduleExportObject);
            });
            return;
        }
        else if (!declaration)
            return;
    };
}
exports.visitExportNamedDeclaration = visitExportNamedDeclaration;
//# sourceMappingURL=ExportNamedDeclaration.js.map