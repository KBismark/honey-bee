const fs = require('fs');
const path = require('path');
const packageJSON = require('./package.json')
// TODO: Babel for transformations to support old browsers.
// const babel = require('@babel/core');
const terser = require('terser');
const sourceFile = path.join(__dirname, '/lib/index.js');
const outputFile = path.join(__dirname, '/lib/index.js.min.js');
const sourceMapFile = path.join(__dirname, '/lib/index.js.map');

// Makes compatible with `import-for-web` usage.
const pathname = `/modules/honey-bee@${packageJSON.version}`;

// Import-for-web server map configuration
const I4W_MAP = `
const path = require('path');
module.exports =() => (
{
  "${pathname}": path.join(\`\${__dirname}/lib\`,"/index.js")
})
`
const exposeAPI = `
if (window.IMEX.isShimmed) {
    Object.defineProperty(window, 'HoneyBee', {
        value: HoneyBee,
        configurable: false,
        enumerable: true,
        writable: false,
    });
} else {
    window.IMEX.pathname = '${pathname}';
    window.IMEX.export = HoneyBee;
}
`
// Update source code to include the exports object;
let sourceCode = `!function(exports){\n${fs.readFileSync(sourceFile, 'utf8')}\n${exposeAPI}
\n}(typeof exports!='undefined'?exports:{});`;
fs.writeFileSync(sourceFile, sourceCode);


// Provide a workarounds for usage with the `bee-server` module
fs.writeFileSync(sourceFile + '.bundle.js', sourceCode);
fs.writeFileSync(sourceFile + '.server.js', `module.exports = (HoneyBee)=>{const IMEX = HoneyBee._imex;
    IMEX.pathname = '${pathname}';
    IMEX.onload = function(){return HoneyBee};
\n}`);

// Update import-for-web mappings
fs.writeFileSync(path.join(__dirname, '/i4w.map.js'), I4W_MAP);

// Minify code
let min = terser.minify(sourceCode, {
    sourceMap: {
        filename:`/module_map${pathname}`,
        url: `/module_map${pathname}`
    },
    compress: {
        "arrows": false,
        "keep_infinity": true,
        "passes": 1,
    },
    format: {
        "comments": false,
        "ie8": true,
        "safari10": true,
        "webkit": true,
        "quote_style": 0,
        
        
    },
    mangle: { }
});
sourceCode = '';
min.then(function (output) {
    fs.writeFileSync(
        outputFile,
        output.code
    )
    output.map = JSON.parse(output.map)
    output.map.sources[0] = `/module_mapsrc${pathname}`;
    output.map = JSON.stringify(output.map)
    fs.writeFileSync(
        sourceMapFile,
        output.map
    )
})
    .catch(function (err) {
    console.log(err);
    throw new Error("Faced problems while minifying code")
})
