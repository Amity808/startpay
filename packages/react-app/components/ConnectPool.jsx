import React, {useState} from 'react'
import CustomInput from './ui/CustomInput'
import SuperfluidABI from "../contract/Superfluid.json"
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'

const ConnectPool = () => {

  const [adminAddress, setAdminAddress] = useState("")


    let providerS;

    if (typeof window !== "undefined" && window?.ethereum) {
      providerS = new ethers.providers.Web3Provider(window?.ethereum, "any")
    }



    const connectPool = async () => {
      if (!providerS) {
        // setMessage('Please connect your wallet first.');
        return;
      }
      
      const poolConfig = {
        transferabilityForUnitsOwner: 0,
        distributionFromAnyAddress: false
      };
      const signer = providerS.getSigner();
      const contract = new ethers.Contract(GDAv1ForwarderAddress, SuperfluidABI.abi, signer);
  
      try {
        const tx = await contract.createPool(poolAddress, adminAddress, newUnit,  poolConfig, {
          gasLimit: ethers.utils.hexlify(1000000),
        });
        const receipt = await tx.wait();
        console.log(receipt)
      } catch (error) {
        console.error('Error creating pool:', error);
        // setMessage('Failed to create pool. Please try again.');
      }
    };
  return (
    <div>
      <h3>Connect To Pool</h3>
      <p>Offset Carbon </p>
      <CustomInput type="text" className={" px-3 py-3 rounded-md mt-3 "} onChange={(e) => setAddressAdmin(e.target.value)} placeholder="Input Admin Address" />
      <button onClick={connectPool} className=' bg-yellow-300/100 p-3 rounded-lg mt-3'>Connect Pool</button>

    </div>
  )
}

export default ConnectPool