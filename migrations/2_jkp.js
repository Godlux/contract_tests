const Jkp = artifacts.require("./contracts/Jkp.sol");

module.exports = function(deployer) {
    deployer.deploy(Jkp);
};
