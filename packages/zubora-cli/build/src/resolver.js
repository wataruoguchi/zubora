"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
function getRelativePath(src, dest) {
    // Calculate the relative import source path for the test file from given source file path and test destination file path.
    var dir = path.parse(dest).dir;
    var relative = path.relative(dir, src);
    return relative.includes('./') ? relative : "./" + relative;
}
exports.getRelativePath = getRelativePath;
function getFileName(filePath) {
    var name = path.parse(filePath).name;
    return name;
}
exports.getFileName = getFileName;
function getFileExt(filePath) {
    var ext = path.parse(filePath).ext;
    return ext;
}
exports.getFileExt = getFileExt;
//# sourceMappingURL=resolver.js.map