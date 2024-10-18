// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedLedger {
    address owner;

    struct MedicalRecord {
        uint256 recordId;
        string patientName;
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

    struct PatientData {
        Vaccine[] vaccinesTaken;
        DrugAllergy[] drugAllergies;
    }

    mapping(uint256 => MedicalRecord[]) private medicalRecords;
    mapping(uint256 => PatientData) private patientData; // Mapping for vaccines and allergies
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
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function authorizeProvider(address provider) public onlyOwner {
        authorizedProviders[provider] = true;
    }

    function addRecord(
        uint256 patientId,
        string memory patientName,
        string memory diagnosis,
        string memory treatment
    ) public onlyAuthorizedProvider {
        uint256 recordId = medicalRecords[patientId].length + 1;
        medicalRecords[patientId].push(
            MedicalRecord(recordId, patientName, diagnosis, treatment, block.timestamp)
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
            MedicalRecord[] memory, 
            Vaccine[] memory, 
            DrugAllergy[] memory
        ) 
    {
        return (
            medicalRecords[patientId], 
            patientData[patientId].vaccinesTaken, 
            patientData[patientId].drugAllergies
        );
    }
}
