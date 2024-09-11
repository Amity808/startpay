import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { celo, celoAlfajores, scrollSepolia } from "viem/chains";
import { WagmiProvider, createConfig, http } from "wagmi";
import Layout from "../components/Layout";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string; // get one at https://cloud.walletconnect.com/app

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [injectedWallet],
    },
  ],
  {
    appName: "Celo Composer",
    projectId,
  }
);

const config = createConfig({
  connectors,
  chains: [celo, celoAlfajores, scrollSepolia],
  transports: {
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
    [scrollSepolia.id]: http()
  },
});

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <SessionProvider>
          <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
