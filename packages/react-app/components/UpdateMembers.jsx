import React, {useState} from 'react'
import CustomInput from './ui/CustomInput'
import SuperfluidABI from "../contract/Superfluid.json"
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'

const UpdateMembers = () => {
    const [addressMember, setAddressMember] = useState("")
    const [poolAddress, setpoolAddress] = useState("")
    const [newUnit, setNewUnit] = useState('')

    const GDAv1ForwarderAddress = '0x6DA13Bde224A05a288748d857b9e7DDEffd1dE08';
    const { address } = useAccount();
    // const token = "0x671425ae1f272bc6f79bec3ed5c4b00e9c628240";

    const fSepolia = "0xa5346f5097f58694eb76357ec7da7bc67f679348"
    // 0x2D567EcE699Eabe5afCd141eDB7A4f2D0D6ce8a0

    const newToken = "0x2D567EcE699Eabe5afCd141eDB7A4f2D0D6ce8a0"

    const eth = "0x58f0a7c6c143074f5d824c2f27a85f6da311a6fb"

    // "0xd6Fee9347E13EF8316254eeFFdD07031699305dD"

    
    let providerS;

    if (typeof window !== "undefined" && window?.ethereum) {
      providerS = new ethers.providers.Web3Provider(window?.ethereum, "any")
    }



    const updateMemberPool = async () => {
      if (!providerS) {
        // setMessage('Please connect your wallet first.');
        return;
      }
  
      const signer = providerS.getSigner();
      const contract = new ethers.Contract(GDAv1ForwarderAddress, SuperfluidABI.abi, signer);
  
      try {
        const tx = await contract.updateMemberUnits(poolAddress, addressMember, newUnit,  "0x", {
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
        <h3>Create A Pool To Get Started</h3>
        <p>Offset Carbon </p>
        <CustomInput type="text" className={" px-3 py-3 rounded-md mt-3 "} onChange={(e) => setAddressMember(e.target.value)} placeholder="Input Member Address" />
        <CustomInput type="text" className={" px-3 py-3 rounded-md mt-3 "} onChange={(e) => setpoolAddress(e.target.value)} placeholder="Input pool address" />
        <CustomInput type="text" className={" px-3 py-3 rounded-md mt-3 "} onChange={(e) => setNewUnit(e.target.value)} placeholder="uint member" />
          <button onClick={updateMemberPool} className=' bg-yellow-300/100 p-3 rounded-lg mt-3'>Update Member</button>
    </div>
  )
}

export default UpdateMembers