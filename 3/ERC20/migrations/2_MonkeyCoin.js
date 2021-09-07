const mc = artifacts.require("MonkeyCoin");

const _name = "MonkeyCoin";
const _symbol = "MKC";
// const _decimals = 0;
// const _totalSupply = 1000;

module.exports = function (deployer) {
  deployer.deploy(mc, _name, _symbol);
};
