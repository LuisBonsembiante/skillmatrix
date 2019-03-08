const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const basePath = path.join(__dirname, '');


const buildPath = path.resolve(basePath, 'build');
fs.removeSync(buildPath);

const contractPath1 = path.resolve(basePath, 'contracts', 'CareerManager.sol');
const contractPath2 = path.resolve(basePath, 'contracts', 'Stage.sol');
const contractPath3 = path.resolve(basePath, 'contracts', 'Ownable.sol');


var input = {
    'Ownable.sol': fs.readFileSync(contractPath3, 'utf8'),
    'CareerManager.sol': fs.readFileSync(contractPath1, 'utf8'),
    'Stage.sol': fs.readFileSync(contractPath2, 'utf8')
};

const output = solc.compile({sources: input}, 1).contracts;

console.log(output);

fs.ensureDirSync(buildPath);

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}

console.log('Compile finish');