pragma solidity ^0.8.0;

contract appen {
    struct MyData {
        uint256 id;
        string name;
    }

    MyData[] public jsonData;

    function storeData(uint256 _id, string memory _name) public {
        MyData memory newData = MyData(_id, _name);
        jsonData.push(newData);
    }

    function getAllData() public view returns (MyData[] memory) {
        return jsonData;
    }

    function jsonDataLength() public view returns (uint256) {
        return jsonData.length;
    }
}