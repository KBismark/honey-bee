const path = require('path');
module.exports = {
    dependencyMap: {[`${path.join(`${__dirname}/lib`,"/index.js")}`]: []},
    dependentsMap:{[`${path.join(`${__dirname}/lib`,"/index.js")}`]: []}
}