import { ethers } from 'ethers';

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      return { provider, signer };
    } catch (error) {
      console.error("User rejected the request:", error);
    }
  } else {
    alert('Please install MetaMask to use this feature.');
    return null;
  }
};
