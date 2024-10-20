import PropTypes from "prop-types";
import { useState } from "react";
import Header from "./Header";

const AddRecords = ({ contract,isOwner }) => {
  const [patientId, setPatientId] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [vaccineName, setVaccineName] = useState("");
  const [allergyName, setAllergyName] = useState("");

  const addRecord = async (e) => {
    e.preventDefault();
    try {
      const tx = await contract.addRecord(patientId, diagnosis, treatment);
      await tx.wait();
      alert("Record added successfully");
      // Reset fields after submission
      setPatientId("");
      setDiagnosis("");
      setTreatment("");
    } catch (err) {
      console.log("Error adding record: ", err);
    }
  };

  const addVaccine = async (e) => {
    e.preventDefault();
    try {
      const tx = await contract.addVaccineTaken(patientId, vaccineName);
      await tx.wait();
      alert("Vaccine added successfully");
      // Reset fields after submission
      setPatientId("");
      setVaccineName("");
    } catch (err) {
      console.log("Error adding vaccine: ", err);
    }
  };

  const addAllergy = async (e) => {
    e.preventDefault();
    try {
      const tx = await contract.addDrugAllergy(patientId, allergyName);
      await tx.wait();
      alert("Allergy added successfully");
      // Reset fields after submission
      setPatientId("");
      setAllergyName("");
    } catch (err) {
      console.log("Error adding allergy: ", err);
    }
  };

  return (
    <main className="bg-[#171718]">
      <Header isOwner={isOwner}/>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 p-5">
        {/* Add Medical Record Form */}
        <form
          className="bg-gray-700 p-6 rounded-lg flex flex-col items-center space-y-3"
          onSubmit={addRecord}
        >
          <span className="text-white text-2xl">Add New Record</span>
          <input
            placeholder="Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            type="text"
            className="text-black w-full p-2 rounded-md"
            required
          />
          <input
            placeholder="Diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            type="text"
            className="text-black w-full p-2 rounded-md"
            required
          />
          <input
            placeholder="Treatment"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            type="text"
            className="text-black w-full p-2 rounded-md"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Add Record
          </button>
        </form>

        {/* Add Vaccine Form */}
        <form
          className="bg-gray-700 p-6 rounded-lg flex flex-col items-center space-y-3"
          onSubmit={addVaccine}
        >
          <span className="text-white text-2xl">Add Vaccine</span>
          <input
            placeholder="Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            type="text"
            className="text-black w-full p-2 rounded-md"
            required
          />
          <input
            placeholder="Vaccine Name"
            value={vaccineName}
            onChange={(e) => setVaccineName(e.target.value)}
            type="text"
            className="text-black w-full p-2 rounded-md"
            required
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-md"
          >
            Add Vaccine
          </button>
        </form>

        {/* Add Allergy Form */}
        <form
          className="bg-gray-700 p-6 rounded-lg flex flex-col items-center space-y-3"
          onSubmit={addAllergy}
        >
          <span className="text-white text-2xl">Add Allergy</span>
          <input
            placeholder="Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            type="text"
            className="text-black w-full p-2 rounded-md"
            required
          />
          <input
            placeholder="Drug Name"
            value={allergyName}
            onChange={(e) => setAllergyName(e.target.value)}
            type="text"
            className="text-black w-full p-2 rounded-md"
            required
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md"
          >
            Add Allergy
          </button>
        </form>
      </div>
    </main>
  );
};

AddRecords.propTypes = {
  contract: PropTypes.object,
  isOwner: PropTypes.bool
};

export default AddRecords;
