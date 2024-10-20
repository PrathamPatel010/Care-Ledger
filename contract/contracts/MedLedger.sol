// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedLedger {
    address owner;
    uint256 private patientIdCounter = 1; // Counter to auto-generate patient IDs

    struct MedicalRecord {
        uint256 id;
        string diagnosis;
        string treatment;
        uint256 timestamp;
    }

    struct Vaccine {
        uint256 id;
        string name;
        uint256 timestamp;
    }

    struct DrugAllergy {
        uint256 id;
        string name;
        uint256 timestamp;
    }

    struct PatientInfo {
        string patientName;
        string dateOfBirth; // Added field
        string fathersName;  // Added field
        string bloodGroup;   // Added field
    }

    struct PatientData {
        Vaccine[] vaccinesTaken;
        DrugAllergy[] drugAllergies;
        PatientInfo patientInfo;
    }

    mapping(uint256 => MedicalRecord[]) private medicalRecords;
    mapping(uint256 => PatientData) private patientData;
    mapping(address => bool) private authorizedProviders;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this function");
        _;
    }

    modifier onlyAuthorizedProvider() {
        require(authorizedProviders[msg.sender], "Not an authorized provider");
        _;
    }

    constructor() {
        owner = msg.sender;
        authorizedProviders[owner] = true; // Automatically authorize the owner
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function authorizeProvider(address provider) public onlyOwner {
        authorizedProviders[provider] = true;
    }

    // Create a new patient with auto-generated patient ID
    function createPatient(
        string memory patientName,
        string memory dateOfBirth,
        string memory fathersName,
        string memory bloodGroup
    ) public onlyAuthorizedProvider returns (uint256) {
        uint256 newPatientId = patientIdCounter;
        patientIdCounter++; // Increment the patient ID counter for next patient

        PatientInfo memory info = PatientInfo({
            patientName: patientName,
            dateOfBirth: dateOfBirth,
            fathersName: fathersName,
            bloodGroup: bloodGroup
        });

        patientData[newPatientId].patientInfo = info;

        return newPatientId; // Return the generated patient ID
    }

    function addRecord(
        uint256 patientId,
        string memory diagnosis,
        string memory treatment
    ) public onlyAuthorizedProvider {
        uint256 recordId = medicalRecords[patientId].length + 1;
        medicalRecords[patientId].push(
            MedicalRecord(recordId, diagnosis, treatment, block.timestamp)
        );
    }

    function addVaccineTaken(uint256 patientId, string memory vaccine) public onlyAuthorizedProvider {
        uint256 vaccineId = patientData[patientId].vaccinesTaken.length + 1;
        patientData[patientId].vaccinesTaken.push(Vaccine(vaccineId, vaccine, block.timestamp));
    }

    function addDrugAllergy(uint256 patientId, string memory allergy) public onlyAuthorizedProvider {
        uint256 allergyId = patientData[patientId].drugAllergies.length + 1;
        patientData[patientId].drugAllergies.push(DrugAllergy(allergyId, allergy, block.timestamp));
    }

    function getRecords(uint256 patientId)
        public
        view
        onlyAuthorizedProvider
        returns (
            PatientInfo memory,
            MedicalRecord[] memory,
            Vaccine[] memory,
            DrugAllergy[] memory
        )
    {
        return (
            patientData[patientId].patientInfo,
            medicalRecords[patientId],
            patientData[patientId].vaccinesTaken,
            patientData[patientId].drugAllergies
        );
    }
}
