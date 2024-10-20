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
      navigate("/records", {
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
    <>
      <Header isOwner={isOwner} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-5">
        <form
          onSubmit={fetchRecords}
          className="bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-80"
        >
        <h1 className="text-white text-2xl mb-6 text-center">Fetch Patient Records</h1>
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="Patient ID"
            className="input text-black w-full p-3 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <button
            type="submit"
            className="btn bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md w-full"
          >
            Fetch Records
          </button>
        </form>
      </div>
    </>
  );
};

FetchRecords.propTypes = {
  contract: PropTypes.object,
  isOwner: PropTypes.bool,
};

export default FetchRecords;
