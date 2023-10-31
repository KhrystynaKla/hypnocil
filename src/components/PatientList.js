import React from "react"
import Patient from "./Patient";

function PatientList({patients, handleAddSide, handleDelete, handleDeceased}) {
    return(
      <table>
          <tbody>
            <tr>
                <th></th>
                <th>Patient ID</th>
                <th>Deceased</th>
                <th>Patient Name</th>
                <th>Noted Side Effects</th>
                <th>Add Side Effects</th>
            </tr>
            {patients.map(patient=>{
              return <Patient handleAddSide={handleAddSide} handleDelete={handleDelete} patient={patient} key={patient.name} handleDeceased={handleDeceased}/>
            })}
          </tbody>
      </table>  
    );
}

export default PatientList;