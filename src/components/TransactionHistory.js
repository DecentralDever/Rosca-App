import React from 'react';
import { motion } from 'framer-motion';

const TransactionHistory = ({ transactions }) => {
  return (
    <motion.div 
      className="mt-8 bg-white shadow-lg rounded-lg p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Transaction History</h2>
      <ul className="divide-y divide-gray-200">
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <li key={index} className="py-4 text-gray-700">
              <p><strong>Type:</strong> {transaction.type}</p>
              <p><strong>Amount:</strong> {transaction.amount} ETH</p>
              <p><strong>Date:</strong> {transaction.date}</p>
            </li>
          ))
        ) : (
          <li className="py-4 text-gray-700">No transactions found.</li>
        )}
      </ul>
    </motion.div>
  );
};

export default TransactionHistory;
