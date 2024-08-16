import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <div>
        <Link to="/" className="text-xl font-bold">RC</Link>
      </div>
    </nav>
  );
};

export default Navbar;
