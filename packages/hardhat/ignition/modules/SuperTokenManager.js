
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const SuperTokenFactory = "0x87560833d59Be057aFc63cFFa3fc531589Ba428F";
const ONE_GWEI = 1_000_000_000n;

module.exports = buildModule("SuperTokenManager", (m) => {
    // 0x87560833d59Be057aFc63cFFa3fc531589Ba428F
  const _superTokenFactory = m.getParameter("_superTokenFactory", SuperTokenFactory);
  

  const _SuperTokenFactory = m.contract("Lock", [_superTokenFactory]);

  console.log(_SuperTokenFactory)

  return { _SuperTokenFactory };
});
