pragma solidity ^0.8.0;

contract second {
    struct MyData {
        uint256 id;
        string name;
    }
    address public owner;
    MyData[] public jsonData;


    constructor() {
        owner = 0x02B3572aC2C334074e5925deE5e5565B545335Ee;
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
        return "two.txt";
    }
}