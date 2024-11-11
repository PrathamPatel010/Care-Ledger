import { useLocation } from "react-router-dom";
import { formatDate } from "../utils/helper";

const DisplayRecords = () => {
  const location = useLocation();
  const {
    authorized,
    patientData,
    patientRecords,
    vaccinesTaken,
    drugAllergies,
  } = location.state || {};

  if (!authorized) {
    return <h1 className="text-4xl text-center">Unauthorized Access</h1>;
  }

  if (!patientData.patientName) {
    return (
      <h1 className="text-4xl text-center">
        Patient with this ID does not exist
      </h1>
    );
  }

  if (patientRecords.length === 0) {
    return (
      <h1 className="text-4xl text-center">
        No records found for this patient ID
      </h1>
    );
  }

  return (
    <main className="bg-[#131b2a] py-10 px-2">
      {/* Patient Info */}
      <table className="mt-3 w-4/5 mx-auto table-auto bg-gray-100 text-black">
        <thead className="bg-gray-300">
          <tr>
            <th
              className="p-2 text-black text-3xl text-center border-b border-black"
              colSpan={2}
            >
              Patient Information
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-300">
            <td className="py-2 px-4 font-semibold w-40">Name:</td>
            <td className="py-2 px-4">{patientData.patientName}</td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="py-2 px-4 font-semibold">Father&apos;s Name:</td>
            <td className="py-2 px-4">{patientData.fathersName}</td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="py-2 px-4 font-semibold">DOB:</td>
            <td className="py-2 px-4">{formatDate(patientData.dateOfBirth)}</td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="py-2 px-4 font-semibold">Blood Group:</td>
            <td className="py-2 px-4">{patientData.bloodGroup}</td>
          </tr>
        </tbody>
      </table>

      {/* Medical History data */}
      <table className="mt-3 w-4/5 mx-auto table-auto bg-gray-100 rounded-xl">
        <thead className="bg-gray-300">
          <tr>
            <th
              colSpan={4}
              className="p-2 text-black text-3xl text-center border-b border-black"
            >
              Medical History
            </th>
          </tr>
          <tr className="border-b border-black">
            <th className="p-2 text-black">Record ID</th>
            <th className="p-2 text-black">Diagnosis</th>
            <th className="p-2 text-black">Treatment</th>
            <th className="p-2 text-black">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {patientRecords.map((record, index) => {
            return (
              <tr key={index} className="text-center border-b border-black">
                <td className="p-2 text-black">
                  {record.id._hex ? parseInt(record.id._hex, 16) : "NA"}
                </td>
                <td className="p-2 text-black">{record.diagnosis}</td>
                <td className="p-2 text-black">{record.treatment}</td>
                <td className="p-2 text-black">
                  {new Date(
                    parseInt(record.timestamp._hex, 16) * 1000
                  ).toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Vaccines Taken data */}
      <table className="mt-3 w-4/5 mx-auto table-auto bg-gray-100 rounded-xl">
        <thead className="bg-gray-300">
          <tr>
            <th
              colSpan={3}
              className="p-2 text-black text-3xl text-center border-b border-black"
            >
              Vaccines Taken
            </th>
          </tr>
          <tr className="border-b border-black">
            <th className="p-2 text-black">Record ID</th>
            <th className="p-2 text-black">Vaccine Name</th>
            <th className="p-2 text-black">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {vaccinesTaken.map((vaccine, index) => {
            return (
              <tr key={index} className="text-center border-b border-black">
                <td className="p-2 text-black">
                  {vaccine.id._hex ? parseInt(vaccine.id._hex, 16) : "NA"}
                </td>
                <td className="p-2 text-black">{vaccine.name}</td>
                <td className="p-2 text-black">
                  {new Date(
                    parseInt(vaccine.timestamp._hex, 16) * 1000
                  ).toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Drug Allergies Data */}
      <table className="mt-3 w-4/5 mx-auto table-auto bg-gray-100 rounded-xl border border-black">
        <thead className="bg-gray-300">
          <tr>
            <th
              colSpan={3}
              className="p-2 text-black text-3xl text-center border-b border-black"
            >
              Drug Allergies
            </th>
          </tr>
          <tr>
            <th className="p-2 text-black border-b border-black">Record ID</th>
            <th className="p-2 text-black border-b border-black">Drug Name</th>
            <th className="p-2 text-black border-b border-black">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {drugAllergies.map((drugAllergy, index) => {
            return (
              <tr key={index} className="border-b border-black text-center">
                <td className="p-2 text-black">
                  {drugAllergy.id._hex
                    ? parseInt(drugAllergy.id._hex, 16)
                    : "NA"}
                </td>
                <td className="p-2 text-black">{drugAllergy.name}</td>
                <td className="p-2 text-black">
                  {new Date(
                    parseInt(drugAllergy.timestamp._hex, 16) * 1000
                  ).toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
};

export default DisplayRecords;
