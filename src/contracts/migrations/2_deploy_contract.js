const Color = artifacts.require("ContractBurger");

module.exports = function(deployer) {
  deployer.deploy(ContractBurger);
};