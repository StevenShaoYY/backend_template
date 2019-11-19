// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  'plugins': {
    // to edit target browsers: use "browserslist" field in package.json
    'autoprefixer': {},
    'postcss-global-namespace-nonamespace': {
      getNameSpace(inputFile) {
        if(inputFile.indexOf('element-ui')>0 || inputFile.indexOf('index')>0 || inputFile.indexOf('normalize')>0) {
          return false
        }
        return '#EYOUMANAGE'
      }
    }
  }
}
