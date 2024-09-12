"use client";
import React from "react";
import GDAv1Forwarder from "../contract/Superfluid.json";
import {
  useAccount,
} from "wagmi";
import { ethers } from "ethers";
import OffsetForm from "../components/OffsetForm";
import UpdateMembers from "../components/UpdateMembers";
// import { createNewPol } from "../distributionpool/index"
const Offset = () => {
  // const token = "0x671425ae1f272bc6f79bec3ed5c4b00e9c628240";
  const { address } = useAccount();

  // const admin = address;
  // const config = {
  //   transferabilityForUnitsOwner: true,
  //   distributionFromAnyAddress: false,
  // };

  // const { startLoading, isLoading, stopLoading } = useLoading()
  // let provider
  // if (typeof window !== "undefined" && window.ethereum) {
  //   provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  // }
  // // const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
  // const signer = provider?.getSigner()

  // const contract = new ethers.Contract(GDAv1Forwarder.address, GDAv1Forwarder.abi, signer)
  // console.log(contract, )
  // const { data: simulateCreatPool, error: simulateError } = useSimulateContract({
  //   abi: GDAv1Forwarder.abi,
  //   address: GDAv1Forwarder.address,
  //   functionName: "createPool",
  //   args: [token, address, config],
  //   account: address
  // });

  // console.log(simulateError)
  // const { data: simulateupdate, error } = useSimulateContract({
  //   abi: GDAv1Forwarder.abi,
  //   address: GDAv1Forwarder.address,
  //   functionName: "updateMemberUnits",
  //   args: [token, admin, config],
  // });

  // const { writeContractAsync } = useWriteContract();

  // const createPool = async () => {
  //   startLoading()
  //   try {
  //     const gasLimit = 3000000; 
  //     const poolcreate = await contract.createPool(token, address, config, {
  //       gasLimit,
  //     });
  //     const resultethe = await poolcreate.wait()
  //     console.log(resultethe, "result")
  //     // const result = await writeContractAsync(simulateCreatPool?.request);
  //     // console.log(result)
  //     const secResult = resultethe.events.find((event) => event.event === "PoolCreated").args
  //   .pool;
  //   console.log(secResult, "secResult")
  //   // return receipt.events.find((event) => event.event === "PoolCreated").args
  //   // .pool;
  //     stopLoading()
  //   } catch (error) {
  //     stopLoading()
  //       console.log(error);
  //   }
  // };

  // console.log(isLoading, "isLoading")

  return (
    <div>
      <h1>Offset</h1>
      {/* <button onClick={createPool}>Create Pool</button> */}
      <OffsetForm />
      <UpdateMembers />
    </div>
  );
};

export default Offset;
