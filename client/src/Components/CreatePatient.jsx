import PropTypes from "prop-types";
import { useState } from "react";
import Header from "./Header";

const CreatePatient = ({ contract, isOwner }) => {
  const [patientName, setPatientName] = useState("");
  const [dob, setDob] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");

  const createPatient = async (e) => {
    e.preventDefault();
    try {
      const tx = await contract.createPatient(
        patientName,
        dob,
        fatherName,
        bloodGroup
      );
      await tx.wait();
      alert("Patient created successfully");
    } catch (err) {
      console.log("Error creating patient: ", err);
    }
  };

  return (
    <main className="bg-[#171718]">
      <Header isOwner={isOwner} />
      <div className="flex justify-center items-center mt-5 pt-10">
        <form
          onSubmit={createPatient}
          className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
        >
          <h2 className="text-2xl text-center text-white">
            Create New Patient
          </h2>

          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Patient Name"
            className="input text-gray-900 bg-gray-300 rounded-md p-2 w-full"
          />

          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="input text-gray-900 bg-gray-300 rounded-md p-2 w-full"
          />

          <input
            type="text"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            placeholder="Father's Name"
            className="input text-gray-900 bg-gray-300 rounded-md p-2 w-full"
          />

          <input
            type="text"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            placeholder="Blood Group"
            className="input text-gray-900 bg-gray-300 rounded-md p-2 w-full"
          />

          <button
            type="submit"
            className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md w-full transition duration-200"
          >
            Create Patient
          </button>
        </form>
      </div>
    </main>
  );
};

CreatePatient.propTypes = {
  contract: PropTypes.object,
  isOwner: PropTypes.bool,
};

export default CreatePatient;
