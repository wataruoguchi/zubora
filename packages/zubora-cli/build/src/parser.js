"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = require("@babel/parser");
function parser(content) {
    try {
        // TODO: Let's determine that the input file is module. We will revisit here.
        var options = { sourceType: 'module' };
        return parser_1.parse(content, options);
    }
    catch (error) {
        throw new Error(JSON.stringify({ error: error, content: content }));
    }
}
exports.parser = parser;
//# sourceMappingURL=parser.js.map