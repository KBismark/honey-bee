const fs = require('fs');
const path = require('path');
const sourceFolder = path.join(__dirname, '/src');
let sourceFiles = fs.readdirSync(sourceFolder, 'utf8');
let index = sourceFiles.indexOf('output');
sourceFiles = [...sourceFiles.slice(0, index), ...sourceFiles.slice(index + 1)];
index = sourceFiles.indexOf('global.ts');
sourceFiles = [...sourceFiles.slice(0, index), ...sourceFiles.slice(index + 1)];
index = sourceFiles.indexOf('finally.ts');
sourceFiles = [...sourceFiles.slice(0, index), ...sourceFiles.slice(index + 1)];
function removeImportStatements(code) {
    const eachImportPattern = /\s*import\s+(.*?)\s+from\s+(("[^"]*")|('[^']*'))/gs;
    return code.replace(eachImportPattern,';\n');
}
try {
    fs.mkdirSync(path.join(__dirname, "/src/output"));
} catch (error) {}
const outputFile = path.join(__dirname, "/src/output/index.ts");
fs.writeFileSync(outputFile, removeImportStatements(fs.readFileSync(path.join(sourceFolder, '/global.ts'),'utf8')));
for (let i = 0; i < sourceFiles.length; i++){
    fs.appendFileSync(outputFile, '\n');
    fs.appendFileSync(outputFile, removeImportStatements(fs.readFileSync(path.join(sourceFolder, sourceFiles[i]),'utf8')));
}
fs.appendFileSync(outputFile, '\n');
fs.appendFileSync(outputFile, removeImportStatements(fs.readFileSync(path.join(sourceFolder, '/finally.ts'),'utf8')));
