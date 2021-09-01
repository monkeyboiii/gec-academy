const blockNumber = artifacts.require("BlockNumber");

module.exports = function (deployer) {
  deployer.deploy(blockNumber);
};
