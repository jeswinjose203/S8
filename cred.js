const { Web3 } = require('web3');
const contractAbi =
    [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "credentials",
          "outputs": [
            {
              "internalType": "string",
              "name": "email",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "password",
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
              "internalType": "string",
              "name": "_email",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_password",
              "type": "string"
            }
          ],
          "name": "isCredentialValid",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        }
      ];
const contractAddress = '0x68cA6c3324Bd32e903D75B0b26078181A0E31FDD';

const web3 = new Web3('HTTP://127.0.0.1:7545');

const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Function to check if email and password are valid
async function checkCredentials(email, password) {
    try {
        const result = await contract.methods.isCredentialValid(email, password).call();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Example usage
const emailToCheck = "doctor2@gmail.com";
const passwordToCheck = "password";
checkCredentials(emailToCheck, passwordToCheck)
    .then(result => {
        console.log(`Are the credentials valid?`, result);
    })
    .catch(error => {
        console.error('Error:', error);
    });