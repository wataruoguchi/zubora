import { GluegunToolbox } from 'gluegun'
import { parse } from '../lib/main'
import { parseScript } from 'esprima'

module.exports = {
  name: 'make',
  description:
    'Read a JS file and generate a test file.\nUsage: $ zubora make <source> <destination>',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      print,
      filesystem: { read, exists, write }
    } = toolbox
    const srcPath = parameters.first || ''
    const destPath = parameters.second || ''
    if (srcPath === '') {
      print.error(`Set the source file path.`)
      return
    }
    if (destPath === '') {
      print.error(`Set the destination file path.`)
      return
    }
    if (exists(srcPath) !== 'file') {
      print.error(`Couldn't find the file.`)
      return
    }
    // if (exists(destPath)) {
    //   print.error(`The file "${destPath}" already exists.`)
    //   return
    // }
    const srcContent = read(srcPath)
    print.debug(parseScript(srcContent))
    const template = parse(srcPath, srcContent)
    print.debug(template)
    write(destPath, template)
    return
  }
}
