pragma solidity ^0.8.0;

contract six {
    struct MyData {
        uint256 id;
        string name;
    }
    address public owner;
    MyData[] public jsonData;


    constructor() {
        owner = 0x83787d8fD1bee7FBd5096927D657dDB9DFe0a448;
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
        return "six.txt";
    }
}