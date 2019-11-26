const JSZIP =  require('jszip')
const path =  require('path')
const RawSource = require('webpack-sources').RawSource
const zip = new JSZIP()

class InsertScriptWebpackPlugin {
  constructor(options = {}) {
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
      const folder = zip.folder(this.options.filename);
      for(let filename in compilation.assets) {
        const source = compilation.assets[filename].source()
        folder.file(filename, source)
      }
      zip.generateAsync({
        type:'nodebuffer'
      }).then((content) => {
        console.log(content)
        const outputPath = path.join(compilation.options.output.path,this.options.filename + '.zip')
        const outRelativePath = path.relative(compilation.options.output.path, outputPath)
        compilation.assets[outRelativePath] = new RawSource(content);
        callback()
      });
    });
  }
}

module.exports = InsertScriptWebpackPlugin;
