import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { contractABI,contractAddress } from "../config/contractConfig";
const Healthcare = () => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [providerAddress, setProviderAddress] = useState("");
  const [patientId, setPatientID] = useState("");
  const [patientIdForFetching, setPatientIdForFetching] = useState("");
  const [patientName, setPatientName] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [vaccineName, setVaccineName] = useState("");
  const [allergyName, setAllergyName] = useState("");

  const navigate = useNavigate();

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

  async function authorizeProvider(e) {
    try {
      e.preventDefault();
      if (!isOwner) {
        alert("Only the contract owner can authorize a provider.");
        return;
      }
      const tx = await contract.authorizeProvider(providerAddress);
      await tx.wait();
      alert(`Provider ${providerAddress} authorized successfully`);
    } catch (err) {
      console.log("Error authorizing provider: ", err);
    }
  }

  async function fetchRecords(e) {
    try {
      e.preventDefault();
      const [records, vaccinesTaken, drugAllergies] = await contract.getRecords(
        patientIdForFetching
      );

      // Navigate to records page with fetched data
      navigate("/records", {
        state: {
          patientRecords: records,
          vaccinesTaken: vaccinesTaken,
          drugAllergies: drugAllergies,
        },
      });
    } catch ({ error }) {
      if (error.code === -32603)
        alert("You are not authorized to retrieve records");
      console.log("Error fetching records: ", error);
    }
  }

  async function addRecord(e) {
    try {
      e.preventDefault();
      const tx = await contract.addRecord(
        patientId,
        patientName,
        diagnosis,
        treatment
      );
      await tx.wait();
      alert("New Record added successfully");
    } catch ({ error }) {
      if (error.code === -32603)
        alert("You are not authorized to add new records");
      console.log("Error inserting records: ", error);
    }
  }

  async function addVaccine(e) {
    try {
      e.preventDefault();
      const tx = await contract.addVaccineTaken(patientId, vaccineName);
      await tx.wait();
      alert("Vaccine record added successfully");
    } catch ({ error }) {
      if (error.code === -32603)
        alert("You are not authorized to add new records");
      console.log("Error adding vaccine record", error);
    }
  }

  async function addAllergy(e) {
    try {
      e.preventDefault();
      const tx = await contract.addDrugAllergy(patientId, allergyName);
      await tx.wait();
      alert("Allergy record added successfully");
    } catch ({ error }) {
      if (error.code === -32603)
        alert("You are not authorized to add new records");
      console.log("Error adding allergy record", error);
    }
  }

  return (
    <>
      <main className="mt-5 pt-3">
        {/* Header */}
        <div className="flex flex-col items-center space-y-3">
          <h1 className="text-green-400 text-4xl">CareLedger</h1>
          {account && (
            <div className="text-2xl">Account connected: {account}</div>
          )}
          {isOwner && <p className="text-2xl">You are the contract owner</p>}
        </div>

        {/* Layout below the header */}
        <div
          className={`mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5 justify-center items-start`}
        >
          {/* Left Column - Portion-1 (AuthorizeProvider) */}
          <div className={`flex justify-center`}>
            <form
              className="w-full sm:w-96 bg-gray-500 p-6 rounded-lg flex flex-col items-center space-y-3"
              onSubmit={authorizeProvider}
            >
              <label htmlFor="provider-address" className="text-black text-2xl">
                Authorize Healthcare Provider
              </label>
              <input
                placeholder="Provider Address"
                id="provider-address"
                value={providerAddress}
                onChange={(e) => setProviderAddress(e.target.value)}
                type="text"
                className="text-black w-full p-2 rounded-md"
              />
              <button
                type="submit"
                className="bg-black hover:bg-gray-600 text-white py-2 px-4 rounded-md"
              >
                Authorize Provider
              </button>
            </form>
          </div>

          {/* Center Column - Portion-2 (FetchPatientRecords Form) */}
          <div className="flex justify-center flex-col items-center w-full">
            <form
              className="w-full sm:w-96 bg-gray-500 p-6 rounded-lg flex flex-col items-center space-y-3"
              onSubmit={fetchRecords}
            >
              <span className="text-black text-2xl">Fetch Patient Records</span>
              <input
                placeholder="Patient ID"
                value={patientIdForFetching}
                onChange={(e) => setPatientIdForFetching(e.target.value)}
                type="text"
                className="text-black w-full p-2 rounded-md"
              />
              <button
                type="submit"
                className="bg-black hover:bg-gray-600 text-white py-2 px-4 rounded-md"
              >
                Fetch Records
              </button>
            </form>
          </div>

          {/* Right Column - Portion-3 (Add New Record Forms) */}
          <div
            className={`flex flex-col items-center opacity-100 transition-opacity duration-300`}
          >
            <form
              className="w-full sm:w-96 bg-gray-500 p-6 rounded-lg flex flex-col items-center space-y-3 mb-5"
              onSubmit={addRecord}
            >
              <span className="text-black text-2xl">Add New Record</span>
              <input
                placeholder="Patient ID"
                value={patientId}
                onChange={(e) => setPatientID(e.target.value)}
                type="text"
                className="text-black w-full p-2 rounded-md"
              />
              <input
                placeholder="Patient Name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                type="text"
                className="text-black w-full p-2 rounded-md"
              />
              <input
                placeholder="Diagnosis"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                type="text"
                className="text-black w-full p-2 rounded-md"
              />
              <input
                placeholder="Treatment"
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                type="text"
                className="text-black w-full p-2 rounded-md"
              />
              <button
                type="submit"
                className="bg-black hover:bg-gray-600 text-white py-2 px-4 rounded-md"
              >
                Add Record
              </button>
            </form>

            {/* Add Vaccine Form */}
            <form
              className="w-full sm:w-96 bg-gray-500 p-6 rounded-lg flex flex-col items-center space-y-3 mb-5"
              onSubmit={addVaccine}
            >
              <span className="text-black text-2xl">Add Vaccine</span>
              <input
                placeholder="Patient ID"
                value={patientId}
                onChange={(e) => setPatientID(e.target.value)}
                type="text"
                className="text-black w-full p-2 rounded-md"
              />
              <input
                placeholder="Vaccine Name"
                value={vaccineName}
                onChange={(e) => setVaccineName(e.target.value)}
                type="text"
                className="text-black w-full p-2 rounded-md"
              />
              <button
                type="submit"
                className="bg-black hover:bg-gray-600 text-white py-2 px-4 rounded-md"
              >
                Add Vaccine
              </button>
            </form>

            {/* Add Allergy Form */}
            <form
              className="w-full sm:w-96 bg-gray-500 p-6 rounded-lg flex flex-col items-center space-y-3"
              onSubmit={addAllergy}
            >
              <span className="text-black text-2xl">Add Allergy</span>
              <input
                placeholder="Patient ID"
                value={patientId}
                onChange={(e) => setPatientID(e.target.value)}
                type="text"
                className="text-black w-full p-2 rounded-md"
              />
              <input
                placeholder="Drug Name"
                value={allergyName}
                onChange={(e) => setAllergyName(e.target.value)}
                type="text"
                className="text-black w-full p-2 rounded-md"
              />
              <button
                type="submit"
                className="bg-black hover:bg-gray-600 text-white py-2 px-4 rounded-md"
              >
                Add Allergy
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};
export default Healthcare;
