import React from 'react'
import GiftCard from './card/GiftCard'
import StartpayABi from "../contract/startpay.json"
import { useReadContract, useAccount } from "wagmi"

const Allgift = () => {
  const { address } = useAccount();
    const { data: giftLen } = useReadContract({
        abi: StartpayABi.abi,
        address: StartpayABi.address,
        functionName: "giftLen",
        args: []
    })



    const getGiftList = () => {
      if(!giftLen) return null;
      const result = []
      for (let i = 0; i < giftLen; i++) {
      result.push(
        <GiftCard id={i} key={i} />
      )}
   
      return result;
    }
  return (
    <div>   
      <div className=' mx-auto max-w-4xl py-5 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
            {getGiftList()}
          </div>
      </div>
    </div>
  )
}

export default Allgift
