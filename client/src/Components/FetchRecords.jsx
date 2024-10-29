import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "./Header";

const FetchRecords = ({ contract, isOwner }) => {
  const [patientId, setPatientId] = useState("");
  const navigate = useNavigate();

  const fetchRecords = async (e) => {
    e.preventDefault();
    try {
      // console.log(await contract.getRecords(patientId));
      const [patientData, medicalRecords, vaccinesTaken, drugAllergies] =
        await contract.getRecords(patientId);
      navigate("/view-records", {
        state: {
          authorized: true,
          patientData: patientData || {},
          patientRecords: medicalRecords || [],
          vaccinesTaken: vaccinesTaken || [],
          drugAllergies: drugAllergies || [],
        },
      });
    } catch (err) {
      alert("Error fetching records or unauthorized access");
      console.error("Error fetching records:", err);
    }
  };

  return (
    <main className="bg-gradient-to-b from-gray-900 to-gray-800">
      <Header isOwner={isOwner} />
      <div className="py-14 px-5 flex flex-col items-center justify-center mt-5">
        <form
          onSubmit={fetchRecords}
          className="bg-gray-800 p-8 rounded-lg shadow-lg transition-all transform hover:scale-105 w-full max-w-md space-y-6"
        >
          <h1 className="text-2xl text-center text-white">
            Fetch Patient Records
          </h1>
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="Patient ID"
            className="input text-gray-900 bg-gray-300 rounded-md p-2 w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md w-full transition duration-200"
          >
            Fetch Records
          </button>
        </form>
      </div>
    </main>
  );
};

FetchRecords.propTypes = {
  contract: PropTypes.object,
  isOwner: PropTypes.bool,
};

export default FetchRecords;
