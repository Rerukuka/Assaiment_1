const abi = require('./SimpleWallet_abi.json');  // ABI for the smart contract
const contractAddress = '0x1dfbbb98E0a8966D7f642d779155d2A53AEC78D4';  // Update after deployment

// Import and connect to Web3
const Web3 = require('web3').default;
const web3 = new Web3('http://127.0.0.1:7545');  // Ganache RPC URL

// Instantiate the contract
const contract = new web3.eth.Contract(abi, contractAddress);

/**
 * Check the current balance of the smart contract.
 */
const checkBalance = async () => {
    const balance = await contract.methods.getBalance().call();
    console.log('Contract Balance:', web3.utils.fromWei(balance, 'ether'), 'ETH');
    return balance;
};

/**
 * Send Ether to the smart contract.
 * @param {string} amount - Amount of Ether to send (in ETH)
 */
const sendEther = async (amount) => {
    const accounts = await web3.eth.getAccounts();
    await web3.eth.sendTransaction({
        from: accounts[0],  // Send from the owner's account
        to: contractAddress,
        value: web3.utils.toWei(amount, 'ether'),  // Convert Ether to Wei
        gas: 300000  // Set sufficient gas limit
    });
    console.log(`${amount} Ether Sent!`);
};

/**
 * Withdraw all Ether from the contract (only owner can call).
 */
const withdrawFunds = async () => {
    const accounts = await web3.eth.getAccounts();
    try {
        await contract.methods.withdraw().send({
            from: accounts[0],  // Ensure owner initiates withdrawal
            gas: 500000  // Set high gas limit to avoid out-of-gas errors
        });
        console.log('Funds withdrawn by the owner.');
    } catch (error) {
        console.error('Error during withdrawal:', error.reason || error.message);
    }

    // Recheck balance after withdrawal
    const updatedBalance = await contract.methods.getBalance().call();
    console.log('Contract Balance after Withdrawal:', web3.utils.fromWei(updatedBalance, 'ether'), 'ETH');
};

/**
 * Chain all functions to ensure execution order:
 * 1. Check balance
 * 2. Send Ether
 * 3. Withdraw funds (if balance exists)
 */
const run = async () => {
    await checkBalance();  // Check contract balance
    await sendEther('0.1');  // Send 0.1 ETH to the contract
    await withdrawFunds();  // Withdraw all ETH from the contract
    await checkBalance();  // Final balance check
};

run();
