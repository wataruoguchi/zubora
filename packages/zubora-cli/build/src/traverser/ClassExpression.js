"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("@babel/types");
function buildClassObject(node) {
    if (types_1.isIdentifier(node.id) && types_1.isClassBody(node.body)) {
        var name = node.id.name, body = node.body.body;
        var methodObjects = body
            .map(function (method) {
            if (types_1.isClassMethod(method) && types_1.isIdentifier(method.key)) {
                var name_1 = method.key.name, kind = method.kind, async = method.async;
                return { name: name_1, async: async, kind: kind };
            }
            else {
                return { name: null, async: false, kind: '' }; // This will be ignored by 'filter'
            }
        })
            .filter(function (methodObject) { return methodObject.name; });
        return { name: name, methods: methodObjects };
    }
    else {
        return { name: '', methods: [] };
    }
}
function visitClassExpression(classObjects) {
    return function (path) {
        var classObject = buildClassObject(path.node);
        if (classObject.methods.length) {
            classObjects.push(classObject);
        }
    };
}
exports.visitClassExpression = visitClassExpression;
//# sourceMappingURL=ClassExpression.js.map