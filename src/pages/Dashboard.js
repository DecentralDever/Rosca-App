import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { connectWallet } from '../utils/wallet';
import { motion } from 'framer-motion';
import { FaUserFriends, FaMoneyBillWave, FaWallet } from 'react-icons/fa';
import ConfirmationModal from '../components/ConfirmationModal';
import TransactionHistory from '../components/TransactionHistory';
import MembersList from '../components/MembersList';
import ContributionChart from '../components/ContributionChart';
import BlockExplorer from '../components/BlockExplorer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const rpcUrls = {
  scroll: "https://rpc.scroll.io",
  linea: "https://rpc.linea.build",
  arbitrum: "https://arbitrum.llamarpc.com",
  base: "https://base.llamarpc.com",
  optimism: "https://optimism.llamarpc.com"
  // Add more chains as needed
};

const chainLogos = {
  scroll: "/logos/scroll-logo-.png",
  linea: "/logos/linea-logo.png",
  arbitrum: "/logos/arbitrum-logo.png",
  base: "/logos/base-logo.png",
  optimism: "/logos/optimism-logo.png"
  // Add more logos as needed
};

const Dashboard = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [chainBalances, setChainBalances] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const contributionPercentage = 50; // Example percentage

  const connectToWallet = async () => {
    setIsLoading(true);
    const { signer, provider } = await connectWallet();
    if (signer) {
      const address = await signer.getAddress();
      setWalletAddress(address);
      await fetchBalances(address); // Fetch balances after connecting the wallet
    }
    setIsLoading(false);
  };

  const fetchBalances = async (address) => {
    const balances = {};

    for (const [chain, rpcUrl] of Object.entries(rpcUrls)) {
      try {
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const balance = await provider.getBalance(address);
        balances[chain] = ethers.formatEther(balance);
      } catch (error) {
        console.error(`Failed to fetch balance for ${chain}:`, error);
        balances[chain] = "Error";
      }
    }

    setChainBalances(balances);
  };

  const openModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const handleConfirmAction = () => {
    setIsModalOpen(false);
    toast.success("Action confirmed!");
  };

  // Simulated transaction data
  const transactions = [
    { type: 'Contribution', amount: 1.2, date: '2024-07-01' },
    { type: 'Withdrawal', amount: 0.5, date: '2024-07-10' },
    { type: 'Contribution', amount: 2.0, date: '2024-07-15' },
  ];

  // Simulated member data
  const members = [
    {
      name: 'Member 1',
      totalContributions: 5.0,
      contributionHistory: [
        { amount: 2.0, date: '2024-07-01' },
        { amount: 3.0, date: '2024-07-15' },
      ],
    },
    {
      name: 'Member 2',
      totalContributions: 3.5,
      contributionHistory: [
        { amount: 1.5, date: '2024-07-01' },
        { amount: 2.0, date: '2024-07-10' },
      ],
    },
  ];

  const contributionData = [
    { date: '2024-07-01', amount: 1.2 },
    { date: '2024-07-08', amount: 2.3 },
    { date: '2024-07-15', amount: 1.8 },
    // Add more data points as needed
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <motion.h1 
        className="text-4xl font-bold text-center mb-6 text-blue-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        ROSCA Dashboard
      </motion.h1>

      {!walletAddress && (
        <div className="flex justify-center">
          <button
            onClick={connectToWallet}
            className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-all duration-300 mb-6"
            disabled={isLoading}
          >
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </button>
        </div>
      )}

      {walletAddress && (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {/* Wallet Info */}
          <motion.div 
            className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <FaWallet className="text-4xl text-blue-600 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800">Wallet Information</h2>
            <p className="mt-4 text-gray-600">Address: {walletAddress}</p>
            <h3 className="text-xl font-semibold text-gray-800 mt-4">Balances by Chain:</h3>
            <ul className="mt-2">
              {Object.entries(chainBalances).map(([chain, balance]) => (
                <li key={chain} className="flex items-center space-x-2 text-gray-600">
                  <img src={chainLogos[chain]} alt={`${chain} logo`} className="w-6 h-6" />
                  <span>{chain.charAt(0).toUpperCase() + chain.slice(1)}: {balance} ETH</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ROSCA Stats */}
          <motion.div 
            className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <FaUserFriends className="text-4xl text-green-600 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800">ROSCA Statistics</h2>
            <p className="mt-4 text-gray-600">Total Contributions: 0 ETH</p>
            <p className="text-gray-600">Number of Members: 0</p>
            <p className="text-gray-600">Active Cycle: 1</p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
              <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${contributionPercentage}%` }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Contribution Progress: {contributionPercentage}%</p>
          </motion.div>

          {/* Actions */}
          <motion.div 
            className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <FaMoneyBillWave className="text-4xl text-red-600 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800">Actions</h2>
            <button onClick={() => openModal("Are you sure you want to join ROSCA?")}
              className="mt-4 w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-all duration-300">
              Join ROSCA
            </button>
            <button onClick={() => openModal("Are you sure you want to contribute?")}
              className="mt-4 w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition-all duration-300">
              Contribute
            </button>
            <button onClick={() => openModal("Are you sure you want to withdraw?")}
              className="mt-4 w-full bg-red-500 text-white p-3 rounded hover:bg-red-600 transition-all duration-300">
              Withdraw
            </button>
          </motion.div>
        </motion.div>
      )}

      {walletAddress && (
        <>
          {/* Combined Block Explorer */}
          <BlockExplorer walletAddress={walletAddress} />

          {/* Transaction History */}
          <TransactionHistory transactions={transactions} />

          {/* Contribution Chart */}
          <ContributionChart data={contributionData} />

          {/* Members List */}
          <MembersList members={members} />
        </>
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAction}
        message={modalMessage}
      />

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
