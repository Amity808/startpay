// 'use client';
import React, { useState } from "react";
import { publicClient } from "../helper/clients";
import { ethers } from "ethers";
import { peanut } from "@squirrel-labs/peanut-sdk";
import CustomInput from "../components/ui/CustomInput";
import CustomTextarea from "../components/ui/CustomTextarea";
import {
  useWriteContract,
  useSimulateContract,
  useAccount,
  useReadContract,
} from "wagmi";
import startPayAbi from "../contract/startpay.json"
import { render } from '@react-email/components';
import SendGiftMail from "../emails/Welcome";

// import {sendMailSMT } from "../libs/email"
const Gift = () => {
  const [amount, setAmount] = useState("");
  const [claimTx, setClaimTx] = useState("");
  const [linkStatus, setLinkStatus] = useState("");
  const { address } = useAccount();
  const [link, setLink] = useState('');
  const [txStatus, setTxStatus] = useState('')
  const [content, setContent] = useState("")
  const [email, setEmail] = useState('')
  const [recipentName, setRecipentName] = useState('')
  const [subjectLine, setSubjectLine] = useState('')
  
  const emailHtml = render(<SendGiftMail userFirstname={recipentName} address={address} />);

  const { data: simulateGift, error: simulaterrorGift } = useSimulateContract({
    abi: startPayAbi.abi,
    address: startPayAbi.address,
    functionName: "giftUser",
    args: [address, link, content]
  });

  const { writeContractAsync } = useWriteContract();






  const createPaymentLink = async () => {
    // e.preventDefault();
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      const signer = await provider.getSigner();
      if (!signer) throw new Error("Connect wallet first");
      console.log(signer);
      console.log(signer, "signer");
      const network = signer.provider.getNetwork();
      const chainId = (await network).chainId;

      window.signer = signer;

      const { link, txHash } = await peanut.createLink({
        structSigner: {
          signer: signer,
        },
        linkDetails: {
          chainId: chainId,
          tokenAmount: amount,
          tokenDecimals: 18,
          tokenType: 0,
        },
      });
      setLink(link);
      setTxStatus(txHash);
      return link;
    } catch (error) {
      console.log(error);
    }
  };

  console.log(link);

  const performGift = async (e) => {
    e.preventDefault();

    const link = await createPaymentLink();

    if (link) { 
      fetch('/api/emails/sendemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'bolarinwamuhdsodiq0@gmail.com',
          reciever: email,
          subject: subjectLine,
          message: emailHtml,
        }),
      }).then((res) => res.json()).then(data => console.log(data)).catch(err => console.log(err));
      try {
         await writeContractAsync(
          simulateGift?.request
        )
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div>
      <div className=" text-white flex justify-center items-center flex-col">
        <button onClick={performGift} className=" text-black">Send Email</button>
        <form action="">
          <CustomInput
            className={" mt-5 py-5 px-3 text-black" }
            onChange={(e) => setRecipentName(e.target.value)}
            placeholder={"Reciever Name"}
            name={"name"}
          />
          <CustomInput
            className={" mt-5 py-5 px-3 text-black" }
            onChange={(e) => setSubjectLine(e.target.value)}
            placeholder={"Subject message"}
            name={"name"}
          />
          <CustomInput
            className={" mt-5 py-5 px-3 text-black" }
            onChange={(e) => setAmount(e.target.value)}
            placeholder={"Gifting Amount"}
            name={"name"}
          />
          <CustomInput
            className={" mt-5 text-black"}
            onChange={(e) => setContent(e.target.value)}
            placeholder={"Message to the owner"}
            name={"name"}
          />
          <CustomTextarea 
          onChange={(e) => setContent(e.target.value) }  className=" text-black"/>
          <div>
            <button className=" bg-[#1e50ff] text-white w-[200px] h-[50px] rounded-lg  flex justify-center items-center">
              Create Event
            </button>
          </div>
        </form>
        <form action="">
        <button formAction={performGift}>Send Email</button>
        </form>
      </div>
    </div>
  );
};

export default Gift;
