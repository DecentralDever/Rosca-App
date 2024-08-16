import React from 'react';
import { Link } from 'react-router-dom';
import WalletButton from './WalletButton';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <div>
        <Link to="/" className="text-xl font-bold">Investor Demo</Link>
      </div>
      <div>
        <Link to="/dashboard" className="mr-4">Dashboard</Link>
        <WalletButton />
      </div>
    </nav>
  );
};

export default Navbar;
