pragma solidity ^0.8.0;

contract cred {
    struct Credential {
        string email;
        string password;
    }
    
    Credential[] public credentials;

    constructor() {
        credentials.push(Credential("doctor1@gmail.com", "password1"));
        credentials.push(Credential("doctor2@gmail.com", "password2"));
    }

    function isCredentialValid(string memory _email, string memory _password) public view returns (bool) {
        for (uint i = 0; i < credentials.length; i++) {
            if (compareStrings(credentials[i].email, _email) && compareStrings(credentials[i].password, _password)) {
                return true;
            }
        }
        return false;
    }

    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }
}
