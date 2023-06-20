const path = require('path');
module.exports =() => (
{
  "/modules/honey-bee-demos@1.0.0/netflix-mobile-navigation/exporter.js": path.join(`${__dirname}/dist/modules`,"/netflix-mobile-navigation/exporter.js"),
  "/modules/honey-bee-demos@1.0.0": path.join(`${__dirname}/dist/modules`,"/index.js"),
  "/modules/honey-bee-demos@1.0.0/netflix-mobile-navigation/index.js": path.join(`${__dirname}/dist/modules`,"/netflix-mobile-navigation/index.js"),
})