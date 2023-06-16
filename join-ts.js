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
const outputFile = path.join(__dirname, "/src/output/index.ts");
fs.writeFileSync(outputFile, fs.readFileSync(path.join(sourceFolder, '/global.ts')));
for (let i = 0; i < sourceFiles.length; i++){
    fs.appendFileSync(outputFile, '\n');
    fs.appendFileSync(outputFile, fs.readFileSync(path.join(sourceFolder, sourceFiles[i])));
}
fs.appendFileSync(outputFile, '\n');
fs.appendFileSync(outputFile, fs.readFileSync(path.join(sourceFolder, '/finally.ts')));
