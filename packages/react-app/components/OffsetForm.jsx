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
    // 0x2D567EcE699Eabe5afCd141eDB7A4f2D0D6ce8a0

    const newToken = "0x2D567EcE699Eabe5afCd141eDB7A4f2D0D6ce8a0"

    const eth = "0x58f0a7c6c143074f5d824c2f27a85f6da311a6fb"

    // "0xd6Fee9347E13EF8316254eeFFdD07031699305dD"

    const deploySupertoken = "0x87560833d59Be057aFc63cFFa3fc531589Ba428F"

    
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

        const tx = await contract.createPool(newToken, addressAdmin, poolConfig, {
          gasLimit: ethers.utils.hexlify(1000000),
        });
        const receipt = await tx.wait();
        console.log(receipt)
        
        const [success, poolAddress] = receipt.events.find(e => e.event === 'PoolCreated').args;
        setMessage(`Pool created successfully at ${poolAddress}`);
        console.log(receipt)
      } catch (error) {
        console.error('Error creating pool:', error);
        console.log(error)
        // setMessage('Failed to create pool. Please try again.');
      }
    };
   
  return (
    <div>
        <h3>Create A Pool To Get Started</h3>
        <p>Offset Carbon </p>
        <CustomInput type="text" className={" px-3 py-3 rounded-md mt-3 "} onChange={(e) => setAddressAdmin(e.target.value)} placeholder="Input Admin Address" />
          <button onClick={createPool} className=' bg-yellow-300/100 p-3 rounded-lg mt-3'>Create Pool</button>
    </div>
  )
}

export default OffsetForm