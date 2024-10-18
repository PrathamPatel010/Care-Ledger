const MedLedger = artifacts.require("MedLedger");

module.exports = function (deployer) {
  deployer.deploy(MedLedger);
};
