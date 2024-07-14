import { useSocialConnect } from "@/SocialConnect/useSocialConnect";
import Allgift from "../components/Allgift"
export default function Home() {
  const { account } = useSocialConnect();

  return (
    <main className="w-full flex justify-center text-gray-800 text-lg font-bold items-center">
      {!account
        ? 
        "Connect your wallet to use SocialConnect sp"
        : 
        
        (<>
        <div className="">
        <p>Click on SocialConnect to connect your social</p>
        <Allgift />
        </div>
        </>) 
        }

        
    </main>
  );
}
