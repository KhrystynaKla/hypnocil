import { useState } from "react"


function Patient({patient, handleDelete, handleDeceased, handleAddSide}){


    return (
    <tr>
        <td><button onClick={()=>handleDelete(patient)}>Delete</button></td>
        <td>{patient.id}</td>
        <td onClick={()=>handleDeceased(patient)}>{patient.deceased?'deceased': 'not deceased'}</td>
        <td>{patient.name}</td>
        <td>{(patient.side_effects).length>1 ? patient.side_effects.join(' ') : patient.side_effects[0]}</td>
        <td>
            <select onChange={(event)=>handleAddSide(event, patient)} name="side-effects" id="side_effects" form="new-patient-form">
                <option value="Dizziness">Dizziness</option>
                <option value="nausea">Nausea</option>
                <option value="Somnambulism">Somnambulism</option>
                <option value="Memory">Memory</option>
                <option value="Severe Allergic Reaction">Severe Allergic Reaction</option>
                <option value="Headache">Headache</option>
            </select>
        </td>
    </tr>
    )
}


export default Patient