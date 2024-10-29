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
    <main className="bg-gradient-to-b from-gray-900 to-gray-800">
      <Header isOwner={isOwner} />
      <div className="py-14 px-5 flex justify-center items-center mt-5 pt-10">
        <form
          onSubmit={createPatient}
          className="bg-gray-800 p-8 rounded-lg shadow-lg transition-all transform hover:scale-105 w-full max-w-md space-y-6"
        >
          <h2 className="text-2xl text-center text-white">
            Create New Patient
          </h2>
          {[
            {
              value: patientName,
              setValue: setPatientName,
              placeholder: "Patient Name",
            },
            {
              value: dob,
              setValue: setDob,
              placeholder: "Date of Birth",
              type: "date",
            },
            {
              value: fatherName,
              setValue: setFatherName,
              placeholder: "Father's Name",
            },
            {
              value: bloodGroup,
              setValue: setBloodGroup,
              placeholder: "Blood Group",
            },
          ].map((input, index) => (
            <input
              key={index}
              type={input.type || "text"}
              value={input.value}
              onChange={(e) => input.setValue(e.target.value)}
              placeholder={input.placeholder}
              className="input text-gray-900 bg-gray-300 rounded-md p-2 w-full"
              required
            />
          ))}
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md w-full transition duration-200"
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
