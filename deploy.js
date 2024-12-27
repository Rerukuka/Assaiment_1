
const fs = require('fs');
const solc = require('solc');





const Web3 = require('web3').default;
const web3 = new Web3('http://127.0.0.1:7545');

// Read and compile the contract
const source = fs.readFileSync('SimpleWallet.sol', 'utf8');
const input = {
    language: 'Solidity',
    sources: {
        'SimpleWallet.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['abi', 'evm.bytecode'],
            },
        },
    },
};

const compiledContract = JSON.parse(solc.compile(JSON.stringify(input)));
const abi = compiledContract.contracts['SimpleWallet.sol'].SimpleWallet.abi;
const bytecode = compiledContract.contracts['SimpleWallet.sol'].SimpleWallet.evm.bytecode.object;

// Save ABI to JSON
fs.writeFileSync('SimpleWallet_abi.json', JSON.stringify(abi, null, 2));

// Deploy contract
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    const result = await new web3.eth.Contract(abi)
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    console.log('Contract deployed at:', result.options.address);
    console.log('ABI saved to SimpleWallet_abi.json');
};

deploy();
