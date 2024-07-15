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
import startPayAbi from "../contract/startpay.json";
import { render } from '@react-email/components';
import SendGiftMail from "../emails/Welcome";
import useLoading from "../hooks/useLoading";
import { toast } from "react-toastify";

const Gift = () => {
  const [amount, setAmount] = useState("");
  const [linkStatus, setLinkStatus] = useState("");
  const { address } = useAccount();
  const [link, setLink] = useState('');
  const [txStatus, setTxStatus] = useState('');
  const [content, setContent] = useState("");
  const [email, setEmail] = useState('');
  const [recipentName, setRecipentName] = useState('');
  const [subjectLine, setSubjectLine] = useState('');

  const { isLoading: isLoadGift, startLoading: startLoadPGift, stopLoading: stopLoadPGift } = useLoading();

  const { data: simulateGift, error: simulaterrorGift } = useSimulateContract({
    abi: startPayAbi.abi,
    address: startPayAbi.address,
    functionName: "giftUser",
    args: [address, link, content],
  });

  console.log(simulaterrorGift, "simulate error");

  const { writeContractAsync } = useWriteContract();

  const handleClear = () => {
    setLink("");
    setRecipentName("");
    setEmail("");
    setSubjectLine("");
    setContent("");
    setAmount("");
    setTxStatus("");
  };

  const writeSmart = async () => {
    try {
      await writeContractAsync(simulateGift?.request);
    } catch (error) {
      console.log(error);
    }
  };

  const createPaymentLink = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      const signer = await provider.getSigner();
      if (!signer) throw new Error("Connect wallet first");
      const network = await signer.provider.getNetwork();
      const chainId = network.chainId;

      const { link, txHash } = await peanut.createLink({
        structSigner: { signer },
        linkDetails: {
          chainId,
          tokenAmount: amount,
          tokenDecimals: 18,
          tokenType: 0,
          // tokenAddress: '0x874069fa1eb16d44d622f2e0ca25eea172369bc1',
        },
      });
      setLink(link);
      setTxStatus(txHash);
      return link;
    } catch (error) {
      console.log(error);
    }
  };

  const sendEmail = async (link) => {
    const emailHtml = render(<SendGiftMail userFirstname={recipentName} address={address} link={link} />);

    try {
      const response = await fetch('/api/emails/sendemail', {
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
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const performGift = async () => {
    startLoadPGift();

    try {
      const link = await createPaymentLink();

      if (link) {
        await sendEmail(link);
        await writeSmart();
        handleClear();
      }

      stopLoadPGift();
    } catch (error) {
      console.log(error);
      stopLoadPGift();
    }
  };

  const handleGift = async (e) => {
    e.preventDefault();
    try {
      toast.promise(performGift(), {
        pending: "Sending Gift",
        success: "Gift Sent",
        error: "Unexpected Error contact admin",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="text-white flex justify-center items-center flex-col">
        <form action="" onSubmit={handleGift}>
          <CustomInput
            className="mt-5 py-5 px-3 text-black"
            onChange={(e) => setRecipentName(e.target.value)}
            placeholder="Receiver Name"
            name="name"
          />
          <CustomInput
            className="mt-5 py-5 px-3 text-black"
            onChange={(e) => setSubjectLine(e.target.value)}
            placeholder="Subject message"
            name="name"
          />
          <CustomInput
            className="mt-5 py-5 px-3 text-black"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            name="address"
          />
          <CustomInput
            className="mt-5 py-5 px-3 text-black"
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Gifting Amount"
            name="name"
          />
          <CustomInput
            className="mt-5 py-5 px-3 text-black mb-5"
            onChange={(e) => setContent(e.target.value)}
            placeholder="Message to the owner"
            name="name"
          />
          <div>
            <button className="bg-[#1E002B] text-white w-[200px] h-[50px] rounded-lg flex justify-center items-center" disabled={isLoadGift}>
              Send
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
