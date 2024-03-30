const SimpleStorage = artifacts.require("SimpleStorage");
const second = artifacts.require("second");
const third = artifacts.require("third");
const four = artifacts.require("four");
const five = artifacts.require("five");
const six = artifacts.require("six");
const seven = artifacts.require("seven");
const eight = artifacts.require("eight");
const nine = artifacts.require("nine");
const ten = artifacts.require("ten");
const cred = artifacts.require("cred");
const appen = artifacts.require("appen");
module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(second);
  deployer.deploy(third);
  deployer.deploy(four);
  deployer.deploy(five);
  deployer.deploy(six);
  deployer.deploy(seven);
  deployer.deploy(eight);
  deployer.deploy(nine);
  deployer.deploy(ten);
  deployer.deploy(cred);
  deployer.deploy(appen);
};


