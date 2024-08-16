import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <div>
        <Link to="/" className="text-xl font-bold">Investor Demo</Link>
      </div>
      <div>
        <button 
          onClick={toggleTheme} 
          className="px-4 py-2 bg-gray-200 text-black rounded">
          Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
