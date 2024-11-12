import PropTypes from "prop-types";
import { useState } from "react";
import Header from "./Header";

const AddRecords = ({ contract, isOwner }) => {
  const [patientId, setPatientId] = useState("");
  const [patientIdForVaccine,setPatientIdForVaccine] = useState("");
  const [patientIdForDrug,setPatientIdForDrug] = useState("");
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
      const tx = await contract.addVaccineTaken(patientIdForVaccine, vaccineName);
      await tx.wait();
      alert("Vaccine added successfully");
      // Reset fields after submission
      setPatientIdForVaccine("");
      setVaccineName("");
    } catch (err) {
      console.log("Error adding vaccine: ", err);
    }
  };

  const addAllergy = async (e) => {
    e.preventDefault();
    try {
      const tx = await contract.addDrugAllergy(patientIdForDrug, allergyName);
      await tx.wait();
      alert("Allergy added successfully");
      // Reset fields after submission
      setPatientIdForDrug("");
      setAllergyName("");
    } catch (err) {
      console.log("Error adding allergy: ", err);
    }
  };

  return (
    <main className="bg-gradient-to-b from-gray-900 to-gray-800">
      <Header isOwner={isOwner} />
      <div className="py-14 px-4 grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          {
            title: "Add New Record",
            submitFunction: addRecord,
            inputs: [
              {
                placeholder: "Patient ID",
                value: patientId,
                setValue: setPatientId,
              },
              {
                placeholder: "Diagnosis",
                value: diagnosis,
                setValue: setDiagnosis,
              },
              {
                placeholder: "Treatment",
                value: treatment,
                setValue: setTreatment,
              },
            ],
            buttonColor: "bg-blue-600 hover:bg-blue-500",
          },
          {
            title: "Add Vaccine",
            submitFunction: addVaccine,
            inputs: [
              {
                placeholder: "Patient ID",
                value: patientIdForVaccine,
                setValue: setPatientIdForVaccine,
              },
              {
                placeholder: "Vaccine Name",
                value: vaccineName,
                setValue: setVaccineName,
              },
            ],
            buttonColor: "bg-green-600 hover:bg-green-500",
          },
          {
            title: "Add Allergy",
            submitFunction: addAllergy,
            inputs: [
              {
                placeholder: "Patient ID",
                value: patientIdForDrug,
                setValue: setPatientIdForDrug,
              },
              {
                placeholder: "Drug Name",
                value: allergyName,
                setValue: setAllergyName,
              },
            ],
            buttonColor: "bg-red-600 hover:bg-red-500",
          },
        ].map(({ title, submitFunction, inputs, buttonColor }, index) => (
          <form
            key={index}
            className="bg-gray-700 p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 text-center flex flex-col gap-y-5"
            onSubmit={submitFunction}
          >
            <span className="text-white text-2xl mb-3">{title}</span>
            {inputs.map((input, i) => (
              <input
                key={i}
                placeholder={input.placeholder}
                value={input.value}
                onChange={(e) => input.setValue(e.target.value)}
                type="text"
                className="text-black w-full p-2 rounded-md"
                required
              />
            ))}
            <button
              type="submit"
              className={`${buttonColor} text-white py-2 px-4 rounded-md transition duration-200`}
            >
              {title.split(" ")[1]} Record
            </button>
          </form>
        ))}
      </div>
    </main>
  );
};

AddRecords.propTypes = {
  contract: PropTypes.object,
  isOwner: PropTypes.bool,
};

export default AddRecords;
