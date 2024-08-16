import axios from 'axios';

const apiKeys = {
  etherscan: 'YOUR_ETHERSCAN_API_KEY',
  arbiscan: 'YOUR_ARBISCAN_API_KEY',
  // Add more API keys as needed
};

export const fetchEtherscanTransactions = async (address) => {
  try {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${apiKeys.etherscan}`
    );
    return response.data.result;
  } catch (error) {
    console.error('Error fetching Etherscan transactions:', error);
    return [];
  }
};

export const fetchArbiscanTransactions = async (address) => {
  try {
    const response = await axios.get(
      `https://api.arbiscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${apiKeys.arbiscan}`
    );
    return response.data.result;
  } catch (error) {
    console.error('Error fetching Arbiscan transactions:', error);
    return [];
  }
};

// Add similar functions for other block explorers

export const aggregateTransactions = async (address) => {
  const etherscanTransactions = await fetchEtherscanTransactions(address);
  const arbiscanTransactions = await fetchArbiscanTransactions(address);

  // Combine all transactions into a single list
  let allTransactions = [
    ...etherscanTransactions,
    ...arbiscanTransactions,
    // Add more transactions from other explorers
  ];

  // Sort transactions by timestamp (assuming transactions have a `timeStamp` field)
  allTransactions.sort((a, b) => parseInt(b.timeStamp) - parseInt(a.timeStamp));

  return allTransactions;
};
