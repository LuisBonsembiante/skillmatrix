const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');


const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const careerManagerPath = path.resolve(__dirname, 'contracts', 'careerManager.sol');
const source = fs.readFileSync(careerManagerPath, 'utf8');
const output = solc.compile(source, 1).contracts;

console.log(output);

fs.ensureDirSync(buildPath);

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}

console.log('Compile finish');