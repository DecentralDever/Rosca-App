import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { connectWallet } from '../utils/wallet';
import { motion } from 'framer-motion';
import { FaUserFriends, FaMoneyBillWave, FaWallet } from 'react-icons/fa';
import ConfirmationModal from '../components/ConfirmationModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContributionChart from '../components/ContributionChart';


const Dashboard = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const contributionPercentage = 83.2; 
  const contributionData = [
    { date: '2024-07-01', amount: 1.2 },
    { date: '2024-07-08', amount: 2.3 },
    { date: '2024-07-15', amount: 1.8 },
    // Add more data points as needed
  ];
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Other components */}
      
      <ContributionChart data={contributionData} />
  
      {/* Other components */}
    </div>
  );

  useEffect(() => {
    const loadWalletData = async () => {
      const { signer, provider } = await connectWallet();
      if (signer) {
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        setWalletAddress(address);
        setBalance(ethers.formatEther(balance));
        setIsLoading(false);
      }
    };
    loadWalletData();
  }, []);

  const openModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const handleConfirmAction = () => {
    setIsModalOpen(false);
    toast.success("Action confirmed!");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

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

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
          <p className="text-gray-600">Balance: {balance} ETH</p>
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

      {/* Members List */}
      <motion.div 
        className="mt-8 bg-white shadow-lg rounded-lg p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Members List</h2>
        <ul className="divide-y divide-gray-200">
          <li className="py-4 text-gray-700">Member 1</li>
          <li className="py-4 text-gray-700">Member 2</li>
          <li className="py-4 text-gray-700">Member 3</li>
        </ul>
      </motion.div>

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
