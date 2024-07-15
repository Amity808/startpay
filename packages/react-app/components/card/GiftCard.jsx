import React, { useCallback, useEffect, useState } from "react";
import { useReadContract, useAccount } from "wagmi";
import startpay from "../../contract/startpay.json";
import Link from "next/link";
import { truuncateAddress } from "@/utils/index";
import { toast } from "react-toastify";
import { FaCopy } from "react-icons/fa";

const GiftCard = ({ id }) => {
  const { address } = useAccount();
  const {
    data: getGift,
    isError,
    isLoading,
    error,
  } = useReadContract({
    abi: startpay.abi,
    address: startpay.address,
    functionName: "_gifts",
    args: [address, id],
  });
  console.log(error, "error");

  const [gifts, setGifts] = useState(null);
  const [copyAddress, setCopyAddress] = useState("");
  console.log(getGift, "getgifts");

  const getGiftsFormated = useCallback(() => {
    if (!getGift) return null;
    setGifts({
      owner: getGift[0],
      gifter: getGift[1],
      link: getGift[2],
      content: getGift[3],
    });
  }, [getGift]);
  console.log(getGift);
  console.log(gifts, "gifts");

  useEffect(() => {
    getGiftsFormated();
  }, [getGiftsFormated]);

  if (!gifts) return null;

  const handleCopy = (copyAdd) => {
    setCopyAddress(copyAdd);
    navigator.clipboard.writeText(`${copyAdd}`);
    toast.success(`Address copied ${copyAdd}`);
  };
  return (
    <div>
      { address == gifts?.owner ? (<>
      
      <div className="card bg-[#1E002B] text-primary-content w-[348px] rounded-md">
        <div className="card-body  text-white rounded-lg py-5 px-4">
          <h2 className="card-title">Gift Sent Out</h2>
          <div className=" flex flex-col justify-start ">
            <p>Gift Message: {gifts?.content}</p>
            <span className=" cursor-pointer flex flex-row justify-start gap-3 items-center pt-2">
              <p onClick={() => handleCopy(gifts?.gifter)}>
                Recipent: {truuncateAddress(gifts?.gifter)}
              </p>
              <FaCopy width={24} height={24} />
            </span>
            {/* <p>{getGift?.link}</p> */}
          </div>

          <div className="card-actions justify-end">
            <Link href={`${gifts?.link}`}>
              <button className="btn border-2 border-white p-2 mt-2 mb-2">
                Link Status
              </button>
            </Link>
          </div>
        </div>
      </div>
      </>) : (<>No Transaction History</>) }
    </div>
  );
};

export default GiftCard;
