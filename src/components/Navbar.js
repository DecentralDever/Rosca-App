import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="p-4 bg-blue-600 text-white">
      <Link to="/" className="mr-4">Home</Link>
      <Link to="/education" className="mr-4">What is ROSCA?</Link>
      {/* Other links */}
    </nav>
  );
};

export default Navbar;
