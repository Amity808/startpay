'use client'
import React, { useState } from "react";
import { sendEmail } from "../libs/email";
import SendGiftMail from "../emails/Welcome";
import { useAccount } from 'wagmi'
import { render } from '@react-email/components';

const Email = () => {
  const [responseMessage, setResponseMessage] = useState(
    {isSuccessful: false, message: ''});

    const { address } = useAccount();
    const emailHtml = render(<SendGiftMail userFirstname="CryptGift" address={address} />);
  const sendmai = async (e) => {
    e.preventDefault();

    fetch('/api/emails/sendemail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'bolarinwamuhdsodiq0@gmail.com',
        reciever: 'bolarinwamuhdsodiq0@gmail.com',
        subject: 'Claim your gift below',
        text: 'test text',
        message: emailHtml,
      }),
    }).then((res) => res.json()).then(data => console.log(data)).catch(err => console.log(err));
  };
  return (
    <div className=" text-blac">
      <form action="" onSubmit={sendmai}>
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
};

export default Email;
