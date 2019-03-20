var Empty = artifacts.require("Empty");
var Counter = artifacts.require("Counter");
//var Ballot = artifacts.require("Ballot");

module.exports = function(deployer) {
    deployer.deploy(Empty);
    deployer.deploy(Counter);
    //deployer.deploy(Ballot);
};

