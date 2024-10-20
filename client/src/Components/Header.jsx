import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ account, isOwner }) => {
  const [isNavOpen, setIsNavOpen] = useState(false); // State to manage navbar visibility

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev); // Toggle the state
  };

  return (
    <main className="bg-[#171718] pt-10">
      <div className="flex flex-col items-center space-y-3">
        <h1 className="text-green-400 text-4xl">CareLedger</h1>
      </div>

      {/* Hamburger Menu Button */}
      <div className="block sm:hidden">
        <button
          onClick={toggleNav}
          className="text-white text-2xl focus:outline-none"
        >
          {isNavOpen ? "✖" : "☰"}{" "}
          {/* Display X when open, Hamburger when closed */}
        </button>
      </div>

      {/* Navbar */}
      <nav
        className={`mt-5 ${isNavOpen ? "block" : "hidden"} sm:block`} // Show or hide based on state
      >
        <ul className="flex flex-col text-center sm:flex-row space-y-2 sm:space-y-0 sm:space-x-5 text-white text-lg justify-center">
          <li>
            <Link to="/" className="hover:text-green-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/new-patient" className="hover:text-green-400">
              Add Patient
            </Link>
          </li>
          <li>
            <Link to="/authorize-provider" className="hover:text-green-400">
              Authorize Provider
            </Link>
          </li>
          <li>
            <Link to="/add-records" className="hover:text-green-400">
              Add Records
            </Link>
          </li>
          <li>
            <Link to="/fetch-records" className="hover:text-green-400">
              Fetch Records
            </Link>
          </li>
          <li>
            <Link to="/records" className="hover:text-green-400">
              View Records
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex flex-col items-center">
        {account && <div className="text-lg">Account connected: {account}</div>}
        {isOwner && <p className="text-lg">You are the contract owner</p>}
      </div>
    </main>
  );
};

Header.propTypes = {
  account: PropTypes.string,
  isOwner: PropTypes.bool,
};

export default Header;
