const path = require('path')
const { getPath } = require('import-for-web')
const deps = {value:{dependencyMap:{},dependentsMap:{}}};
 const Map1 = 
{
  [`${path.join(`${__dirname}/dist/modules`,"/index.js")}`]: [],

  [`${path.join(`${__dirname}/dist/modules`,"/netflix-mobile-navigation/exporter.js")}`]: [
  path.join(`${__dirname}/dist/modules`,"/netflix-mobile-navigation/index.js")
],

  [`${path.join(`${__dirname}/dist/modules`,"/netflix-mobile-navigation/index.js")}`]: [],

}
const Map2 = {
  [`${path.join(`${__dirname}/dist/modules`,"/index.js")}`]: [
  path.join(`${__dirname}/dist/modules`,"/netflix-mobile-navigation/index.js")
],

  [`${path.join(`${__dirname}/dist/modules`,"/netflix-mobile-navigation/exporter.js")}`]: [
  path.join(`${__dirname}/dist/modules`,"/index.js")
],

  [`${path.join(`${__dirname}/dist/modules`,"/netflix-mobile-navigation/index.js")}`]: [
  path.join(`${__dirname}/dist/modules`,"/netflix-mobile-navigation/exporter.js")
],

}
deps.value.dependencyMap = {
  ...deps.value.dependencyMap, ...Map1
}
deps.value.dependentsMap = {
  ...deps.value.dependentsMap, ...Map2
}
module.exports = deps.value