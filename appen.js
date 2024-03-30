const { Web3 } = require('web3');   
const abi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "jsonData",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "storeData",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllData",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            }
          ],
          "internalType": "struct appen.MyData[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
        "inputs": [],
        "name": "jsonDataLength",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }
  ]; // Replace with your ABI file path
const contractAddress = '0x24CEa19011e60FddcD77859E7f9D4b6Df119A58A'; // Replace with your deployed contract address

const web3 = new Web3('HTTP://127.0.0.1:7545'); // Connect to your local Ethereum node

const privateKey = '0x48c80b85f1720bb2742656e4b481bbfea8257310ca7bd4b815d7f7d47cc2eec7'; // Replace with your Ethereum account private key
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

const contract = new web3.eth.Contract(abi, contractAddress);

// Function to store data in the smart contract
async function storeData(name) {
    try {
        const data = await contract.methods.getAllData().call();

        //console.log('All Data:', data);
        id = Object.keys(data).length;
        // Call the storeData function on the contract and specify the data values
        const transaction = await contract.methods.storeData(id, name).send({ from: account.address });
        
        //console.log('Data stored in contract. Transaction Hash:', transaction.transactionHash);
    } catch (error) {
        console.error('Error storing data:', error);
    }
}

// Function to retrieve all data from the smart contract
async function getAllData() {
    try {
        // Call the getAllData function on the contract to retrieve all data
        const data = await contract.methods.getAllData().call();

        return data;
    } catch (error) {
        console.error('Error retrieving data:', error);
    }

}

(async () => {
    // Example usage: Store data in the smart contract
    await storeData('Jeswin');

    // Example usage: Retrieve all data from the smart contract
    var k = await getAllData();
    console.log(k);
})();

