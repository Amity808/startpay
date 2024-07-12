import { ethers } from "ethers";
import abi from "./contract/abi.json"
// Connect to an Ethereum node
const provider = new ethers.providers.JsonRpcProvider("https://alfajores-forno.celo-testnet.org");

// Connect to the CFAv1Forwarder contract
const contractAddress = "0xcfA132E353cB4E398080B9700609bb008eceB125";
const abi = abi.abi;
const cfaForwarder = new ethers.Contract(contractAddress, abi, provider);
const gdacontractAddress = "0x6DA13Bde224A05a288748d857b9e7DDEffd1dE08"
const gdaForwarder = new ethers.Contract(gdacontractAddress, abi, provider);


async function createPool(token, admin, config) {
    const tx = await gdaForwarder.createPool(token, admin, config);
    const receipt = await tx.wait();
    return receipt.events.find((event) => event.event === "PoolCreated").args
      .pool;
  }

  async function updateMemberUnits(pool, memberAddress, newUnits, userData) {
    const tx = await gdaForwarder.updateMemberUnits(pool, memberAddress, newUnits, userData);
    await tx.wait();
  }

  async function distribute(token, from, pool, requestedAmount, userData) {
    const tx = await gdaForwarder.distribute(token, from, pool, requestedAmount, userData);
    await tx.wait();
  }

  async function distributeFlow(token, from, pool, requestedFlowRate, userData) {
    const tx = await gdaForwarder.distributeFlow(token, from, pool, requestedFlowRate, userData);
    await tx.wait();
  }

  async function claimAll(pool, memberAddress, userData) {
    const tx = await gdaForwarder.claimAll(pool, memberAddress, userData);
    await tx.wait();
  }

  async function connectPool(pool, userData) {
    const tx = await gdaForwarder.connectPool(pool, userData);
    await tx.wait();
  }

  async function disconnectPool(pool, userData) {
    const tx = await gdaForwarder.disconnectPool(pool, userData);
    await tx.wait();
  }

  // Usage example
const token = "0xYourTokenAddress";
const from = "0xYourAddress";
const pool = "0xPoolAddress";
const requestedAmount = ethers.utils.parseUnits("10", 18); // Example amount
const userData = "0x"; // Example user data

distribute(token, from, pool, requestedAmount, userData)
  .then(() => console.log("Distribution successful"))
  .catch((error) => console.error("Error distributing tokens:", error));