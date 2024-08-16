import React, { useState } from 'react';
import { connectWallet } from '../utils/wallet';

const WalletButton = () => {
  const [walletAddress, setWalletAddress] = useState("");

  const handleConnectWallet = async () => {
    const { signer } = await connectWallet();
    if (signer) {
      const address = await signer.getAddress();
      setWalletAddress(address);
    }
  };

  return (
    <button
      onClick={handleConnectWallet}
      className="px-4 py-2 bg-green-500 text-white rounded"
    >
      {walletAddress ? walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4) : "Connect Wallet"}
    </button>
  );
};

export default WalletButton;
