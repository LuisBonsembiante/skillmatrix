const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/careerManager.json');


const provider = new HDWalletProvider(
    'switch add vibrant avocado female clip name sight agree accuse believe outer',
    'https://rinkeby.infura.io/v3/2052c39b562645f6b3c3794b3ab4912e'
);

web3 = new Web3(provider);

const deploy = async () => {

    const accounts = await web3.eth.getAccounts();

    console.log('Attemting deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({data: '0x' + compiledFactory.bytecode }) // add 0x bytecode
        .send({from: accounts[0]}); // remove 'gas'

    console.log(compiledFactory.interface);
    console.log('Contract deploy to', result.options.address);

};

deploy();