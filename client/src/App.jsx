import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../src/config/contractConfig";
import CreatePatient from "./Components/CreatePatient";
import AuthorizeProvider from "./Components/AuthorizeProvider";
import AddRecords from "./Components/AddRecords";
import FetchRecords from "./Components/FetchRecords";
import DisplayRecords from "./Components/DisplayRecords";
import Header from "./Components/Header";

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const connectWallet = async () => {
      try {
        // Connect to Ganache
        const provider = new ethers.providers.JsonRpcProvider(
          "http://127.0.0.1:7545"
        );

        // Get list of accounts from Ganache
        const accounts = await provider.listAccounts();
        const accountAddress = accounts[0]; // Use the first account from Ganache
        setAccount(accountAddress);

        // Create a signer from the provider
        const signer = provider.getSigner(0); // Ganache's first account as the signer

        // Set up the contract instance with the signer
        const Contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setContract(Contract);

        // Get contract owner
        const ownerAddress = await Contract.getOwner();
        setIsOwner(accountAddress.toLowerCase() === ownerAddress.toLowerCase());
      } catch (err) {
        console.log("Error connecting to Ganache:", err);
      }
    };
    connectWallet();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={<Header account={account} isOwner={isOwner} />}
        />
        <Route
          path="/"
          element={<Header account={account} isOwner={isOwner} />}
        />
        <Route
          path="/add-patient"
          element={<CreatePatient isOwner={isOwner} contract={contract} />}
        />
        <Route
          path="/authorize-provider"
          element={<AuthorizeProvider contract={contract} isOwner={isOwner} />}
        />
        <Route
          path="/add-records"
          element={<AddRecords contract={contract} />}
        />
        <Route
          path="/fetch-records"
          element={<FetchRecords contract={contract} />}
        />
        <Route path="/view-records" element={<DisplayRecords />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
