import PropTypes from "prop-types";
import { useState } from "react";
import Header from "./Header";

const AuthorizeProvider = ({ contract, isOwner }) => {
  const [providerAddress, setProviderAddress] = useState("");

  const authorizeProvider = async (e) => {
    e.preventDefault();
    try {
      const tx = await contract.authorizeProvider(providerAddress);
      await tx.wait();
      alert("Provider authorized successfully");
    } catch (err) {
      console.log("Error authorizing provider: ", err);
    }
  };

  return (
    <main className="bg-gradient-to-b from-gray-900 to-gray-800">
      <Header isOwner={isOwner} />
      <div className="py-14 px-5 flex justify-center items-center mt-10">
        <form
          onSubmit={authorizeProvider}
          className="bg-gray-800 p-8 rounded-lg shadow-lg transition-all transform hover:scale-105 w-full max-w-md space-y-6"
        >
          <h2 className="text-2xl text-center text-white">
            Authorize Provider
          </h2>
          <input
            type="text"
            value={providerAddress}
            onChange={(e) => setProviderAddress(e.target.value)}
            placeholder="Provider Address"
            className="input text-gray-900 bg-gray-300 rounded-md p-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md w-full transition duration-200"
            disabled={!isOwner}
          >
            Authorize
          </button>
        </form>
      </div>
    </main>
  );
};

AuthorizeProvider.propTypes = {
  contract: PropTypes.object,
  isOwner: PropTypes.bool.isRequired,
};

export default AuthorizeProvider;
