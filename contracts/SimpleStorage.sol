pragma solidity ^0.8.0;

contract SimpleStorage {
    struct MyData {
        uint256 id;
        string name;
    }
    address public owner;
    MyData[] public jsonData;


    constructor() {
        owner = 0xF5AF1d3C9E7b969e258D2738b511d6E4Fe917425;
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
        return "one.txt";
    }
}