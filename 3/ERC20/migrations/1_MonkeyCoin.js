const mc = artifacts.require("MonkeyCoin");

module.exports = function (deployer) {
  deployer.deploy(mc);
};
