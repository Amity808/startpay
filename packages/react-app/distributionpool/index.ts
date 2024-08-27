import { useState } from "react";
import { ethers } from "ethers";
// import { useAccount } from "wagmi";
import SuperfluidABI from "@/contract/Superfluid.json"
// import useLoading from "@/hooks/useLoading";

const token = "0x671425ae1f272bc6f79bec3ed5c4b00e9c628240";

let provider: any;
if (typeof window !== "undefined" && window?.ethereum) {
  provider = new ethers.providers.Web3Provider(window?.ethereum, "any");
}

const config = {
  transferabilityForUnitsOwner: true,
  distributionFromAnyAddress: false,
};

const [loading, setloading] = useState(false);

export const createNewPol = async ({ address }: any) => {
  setloading(true);
  try {
    const signer = await provider?.getSigner();
    const contract = new ethers.Contract(SuperfluidABI.address, SuperfluidABI.abi, signer);

    const tx = await contract.createPool(token, address, config);
    const receipt = await tx.wait();
    console.log(receipt);
    return receipt.events.find((event: any) => event.event === "PoolCreated").args.pool;
    setloading(false);
  } catch (error) {
    setloading(false);
    console.log(error);
  }
};

export const handleUpdateMembers = async ({ memberAddress }: any) => {
  try {
    const signer = await provider?.getSigner();
    const contract = new ethers.Contract(SuperfluidABI.address, SuperfluidABI.abi, signer);

    const tx = await contract.updateMemberUnits(token, memberAddress, config);
    const receipt = await tx.wait();
    console.log(receipt);
  } catch (error) {
    console.log(error);
  }
};

export const distributeToken = async ({ from, pool, requestedAmount, userData }: any) => {
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

export const claimToken = async ({ pool, memberAddress, userData }: any) => {
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