import { useMemo } from "react";
import { WalletProvider as AleoWalletProvider, useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import { DecryptPermission, WalletAdapterNetwork } from "@demox-labs/aleo-wallet-adapter-base";

// Import wallet adapter styles
import "@demox-labs/aleo-wallet-adapter-reactui/styles.css";

export function WalletProvider({ children }) {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: "ShieldPay",
      }),
    ],
    []
  );

  return (
    <AleoWalletProvider
      wallets={wallets}
      decryptPermission={DecryptPermission.UponRequest}
      network={WalletAdapterNetwork.TestnetBeta}
      autoConnect={true}
    >
      <WalletModalProvider>
        {children}
      </WalletModalProvider>
    </AleoWalletProvider>
  );
}

// Re-export useWallet hook for convenience
export { useWallet };
