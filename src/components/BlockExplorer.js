import React, { useState, useEffect } from 'react';
import { aggregateTransactions } from '../utils/fetchTransactions';
import { ethers } from 'ethers';

const BlockExplorer = ({ walletAddress }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchAndAggregateTransactions = async () => {
      const allTransactions = await aggregateTransactions(walletAddress);
      setTransactions(allTransactions);
    };

    fetchAndAggregateTransactions();
  }, [walletAddress]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Combined Block Explorer</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Tx Hash</th>
            <th className="py-2 px-4 border-b border-gray-200">Block</th>
            <th className="py-2 px-4 border-b border-gray-200">From</th>
            <th className="py-2 px-4 border-b border-gray-200">To</th>
            <th className="py-2 px-4 border-b border-gray-200">Value (ETH)</th>
            <th className="py-2 px-4 border-b border-gray-200">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.hash}>
              <td className="py-2 px-4 border-b border-gray-200">
                {tx.hash ? (
                  <a
                    href={`https://etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {tx.hash.slice(0, 10)}...
                  </a>
                ) : (
                  'N/A'
                )}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">{tx.blockNumber || 'N/A'}</td>
              <td className="py-2 px-4 border-b border-gray-200">{tx.from ? tx.from.slice(0, 6) + '...' : 'N/A'}</td>
              <td className="py-2 px-4 border-b border-gray-200">{tx.to ? tx.to.slice(0, 6) + '...' : 'N/A'}</td>
              <td className="py-2 px-4 border-b border-gray-200">{tx.value ? ethers.formatEther(tx.value) + ' ETH' : 'N/A'}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                {tx.timeStamp ? new Date(tx.timeStamp * 1000).toLocaleDateString() : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlockExplorer;
