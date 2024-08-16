import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import React Router components
import Navbar from './components/Navbar'; // Import the Navbar component
import Dashboard from './pages/Dashboard'; // Import the Dashboard component
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
