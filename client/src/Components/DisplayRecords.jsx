import { useLocation } from "react-router-dom";

const DisplayRecords = () => {
  const location = useLocation();
  const { patientRecords, vaccinesTaken, drugAllergies } = location.state || {};

  if (!patientRecords) {
    return <h1 className="text-4xl text-center">Unauthorized Access</h1>;
  }

  if (patientRecords.length === 0) {
    return (
      <h1 className="text-4xl text-center">
        No records found for this patient ID
      </h1>
    );
  }

  return (
    <>
      {/* Patient Name */}
      <div className="mt-5 pt-5 text-slate-200 w-full text-center rounded-md text-4xl">
        Patient Name: {patientRecords[0]?.patientName}
      </div>

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
                  {record.recordId._hex
                    ? parseInt(record.recordId._hex, 16)
                    : "NA"}
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
    </>
  );
};

export default DisplayRecords;
