pragma solidity ^0.8.0;

contract four {
    struct MyData {
        uint256 id;
        string name;
    }
    address public owner;
    MyData[] public jsonData;


    constructor() {
        owner = 0xBf6579e1dc8f882718AB2Dd18525a924A479Cf3d;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }


    function storeData(uint256 _id, string memory _name) public onlyOwner{
        MyData memory newData = MyData(_id, _name);
        jsonData.push(newData);
    }

    function getAllData() public view returns (MyData[] memory) {
        return jsonData;
    }

    function jsonDataLength() public view returns (uint256) {
        return jsonData.length;
    }
    function getPath() public pure returns (string memory) {
        return "four.txt";
    }
}