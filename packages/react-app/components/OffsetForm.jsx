import React, {useState} from 'react'
import CustomInput from './ui/CustomInput'
import SuperfluidABI from "../contract/Superfluid.json"
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'

const OffsetForm = () => {
    const [addressAdmin, setAddressAdmin] = useState("")
    const GDAv1ForwarderAddress = '0x6DA13Bde224A05a288748d857b9e7DDEffd1dE08';
    const { address } = useAccount();
    // const token = "0x671425ae1f272bc6f79bec3ed5c4b00e9c628240";

    const fSepolia = "0xa5346f5097f58694eb76357ec7da7bc67f679348"

    // const eth = "0x0909376f5b32fa6488e9c9b41b32c089fd5d03c4"

    // "0xd6Fee9347E13EF8316254eeFFdD07031699305dD"

    
    let providerS;

    if (typeof window !== "undefined" && window?.ethereum) {
      providerS = new ethers.providers.Web3Provider(window?.ethereum, "any")
    }



    const createPool = async () => {
      if (!providerS) {
        // setMessage('Please connect your wallet first.');
        return;
      }
  
      const signer = providerS.getSigner();
      const contract = new ethers.Contract(GDAv1ForwarderAddress, SuperfluidABI.abi, signer);
  
      try {
        const poolConfig = {
          transferabilityForUnitsOwner: 0,
          distributionFromAnyAddress: false
        };
        // const tx = await contract.createPool(token, address, poolConfig);

        const tx = await contract.createPool(fSepolia, addressAdmin, poolConfig, {
          gasLimit: ethers.utils.hexlify(1000000),
        });
        const receipt = await tx.wait();
        console.log(receipt)
        
        // const [success, poolAddress] = receipt.events.find(e => e.event === 'PoolCreated').args;
        // setMessage(`Pool created successfully at ${poolAddress}`);
        console.log(receipt)
      } catch (error) {
        console.error('Error creating pool:', error);
        // setMessage('Failed to create pool. Please try again.');
      }
    };
   
  return (
    <div>
        <h3>Create A Pool To Get Started</h3>
        <p>Offset Carbon </p>
        <CustomInput type="text" onChange={(e) => setAddressAdmin(e.target.value)} placeholder="Enter Offset Amount" />
          <button onClick={createPool}>Create Pool</button>
    </div>
  )
}

export default OffsetForm