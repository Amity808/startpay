import { useState } from "react";
import { ethers } from "ethers";
// import { useAccount } from "wagmi";
import SuperfluidABI from "@/contract/Superfluid.json"
// import useLoading from "@/hooks/useLoading";

const GDAv1ForwarderAddress = '0x6DA13Bde224A05a288748d857b9e7DDEffd1dE08';

const token = "0x671425ae1f272bc6f79bec3ed5c4b00e9c628240";
const alfaJores = '0x9dBa18e9b96b905919cC828C399d313EfD55D800'

const fspolia = "0xa5346f5097f58694eb76357ec7da7bc67f679348"

let provider;
if (typeof window !== "undefined" && window?.ethereum) {
  provider = new ethers.providers.Web3Provider(window?.ethereum, "any");
}

const poolConfig = {
  transferabilityForUnitsOwner: 0,
  distributionFromAnyAddress: false
};


export const createNewPol = async ({ address }) => {
  if (!ethers.utils.isAddress(address) || !ethers.utils.isAddress(alfaJores)) {
    throw new Error("Invalid Ethereum address provided.");
  }
  
  try {
    const signer = await provider?.getSigner();
    const contract = new ethers.Contract(GDAv1ForwarderAddress, SuperfluidABI.abi, signer);

    const tx = await contract.createPool(fspolia, address, poolConfig);
    const receipt = await tx.wait();
    console.log(receipt);
    return receipt.events.find((event) => event.event === "PoolCreated").args.pool;
    // setloading(false);
  } catch (error) {
    // setloading(false);
    console.log(error);
  }
};

export const handleUpdateMembers = async ({ memberAddress }) => {
  try {
    const signer = await provider?.getSigner();
    const contract = new ethers.Contract(SuperfluidABI.address, SuperfluidABI.abi, signer);

    const tx = await contract.updateMemberUnits(token, memberAddress, poolConfig);
    const receipt = await tx.wait();
    console.log(receipt);
  } catch (error) {
    console.log(error);
  }
};

export const distributeToken = async ({ from, pool, requestedAmount, userData }) => {
  try {
    const signer = await provider?.getSigner();
    const contract = new ethers.Contract(SuperfluidABI.address, SuperfluidABI.abi, signer);

    const tx = await contract.distribute(token, from, pool, requestedAmount, userData);
    const receipt = await tx.wait();
    console.log(receipt);
  } catch (error) {
    console.log(error);
  }
};

export const claimToken = async ({ pool, memberAddress, userData }) => {
  try {
    const signer = await provider?.getSigner();
    const contract = new ethers.Contract(SuperfluidABI.address, SuperfluidABI.abi, signer);

    const tx = await contract.claimAll(pool, memberAddress, userData);
    const receipt = await tx.wait();
    console.log(receipt);
  } catch (error) {
    console.log(error);
  }
};

const connectWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      setMessage(`Connected to ${address}`);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setMessage('Failed to connect wallet. Please try again.');
    }
  } else {
    setMessage('Please install Metamask to use this feature.');
  }
};


const createPool = async ({ adminAddress}) => {
  if (!provider) {
    // setMessage('Please connect your wallet first.');
    return;
  }

  const signer = provider.getSigner();
  const contract = new ethers.Contract(GDAv1ForwarderAddress, SuperfluidABI.abi, signer);

  try {
    const poolConfig = {
      transferabilityForUnitsOwner: 0,
      distributionFromAnyAddress: false
    };
    const tx = await contract.createPool(token, adminAddress, poolConfig);
    const receipt = await tx.wait();
    const [success, poolAddress] = receipt.events.find(e => e.event === 'PoolCreated').args;
    // setMessage(`Pool created successfully at ${poolAddress}`);
  } catch (error) {
    console.error('Error creating pool:', error);
    // setMessage('Failed to create pool. Please try again.');
  }
};