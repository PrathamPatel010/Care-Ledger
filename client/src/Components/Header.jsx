import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ account, isOwner }) => {
  const [isNavOpen, setIsNavOpen] = useState(false); // State to manage navbar visibility

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev); // Toggle the state
  };

  return (
    <main className="p-10 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="flex flex-col items-center space-y-3">
        <h1 className="text-green-400 text-5xl font-bold transition-transform duration-300 transform hover:scale-110">
          CareLedger
        </h1>
      </div>

      {/* Hamburger Menu Button */}
      <div className="block sm:hidden">
        <button
          onClick={toggleNav}
          className="text-white text-2xl focus:outline-none hover:scale-110 transition-transform duration-200"
        >
          {isNavOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Navbar */}
      <nav className={`mt-5 ${isNavOpen ? "block" : "hidden"} sm:block`}>
        <ul className="flex flex-col text-center sm:flex-row space-y-2 sm:space-y-0 sm:space-x-5 text-white text-lg justify-center">
          {[
            "Home",
            "Add Patient",
            "Authorize Provider",
            "Add Records",
            "Fetch Records",
          ].map((item, index) => (
            <li key={index}>
              <Link
                to={`/${item.toLowerCase().replace(/ /g, "-")}`}
                className="hover:text-green-400 transition duration-200"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col items-center mt-5">
        {account && (
          <div className="text-lg text-white text-wrap">
            Account connected: {account}
          </div>
        )}
        {isOwner && (
          <p className="text-lg text-green-400">You are the contract owner</p>
        )}
      </div>
    </main>
  );
};

Header.propTypes = {
  account: PropTypes.string,
  isOwner: PropTypes.bool,
};

export default Header;
