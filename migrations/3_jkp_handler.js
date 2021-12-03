const JkpHandler = artifacts.require("./contracts/JkpHandler.sol");

module.exports = function(deployer) {
    deployer.deploy(JkpHandler);
};
