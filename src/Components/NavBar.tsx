import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 p-4 rounded-full shadow-2xl w-full max-w-2xl mt-2 mx-auto">
      <div className="flex justify-between items-center">
        <div className="text-white text-xl font-bold hidden sm:block">Task Manager</div>
        <div className="space-x-4 hidden sm:flex">
          <Link
            to="/task-management"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Task Management
          </Link>
          <Link
            to="/task-scheduling"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Task Scheduling
          </Link>
          <Link
            to="/task-history"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Task History
          </Link>
        </div>
        <div className="sm:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              ></path>
            </svg>
            Task
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden mt-4 flex flex-col items-center">
          <Link
            to="/task-management"
            className="block text-white hover:text-gray-300 transition duration-300 mb-2"
            onClick={toggleMenu}
          >
            Task Management
          </Link>
          <Link
            to="/task-scheduling"
            className="block text-white hover:text-gray-300 transition duration-300 mb-2"
            onClick={toggleMenu}
          >
            Task Scheduling
          </Link>
          <Link
            to="/task-history"
            className="block text-white hover:text-gray-300 transition duration-300"
            onClick={toggleMenu}
          >
            Task History
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
