import React, {useState} from "react"

function NewPatientForm({addPatient}) {
    const [newForm, setNewForm]=useState({
        name: '',
        side_effects:[],
        deceased: false
    })

    function handleChange(event){
        if (event.target.id==='side_effects'){
            setNewForm({...newForm, [event.target.id]: [...newForm.side_effects, event.target.value]})

        } else {
            setNewForm({...newForm, name: event.target.value})
        }
    }

    function handleSubmit(event){
        event.preventDefault()
        addPatient(newForm)
    }



    return(
        <>
            <form onSubmit={handleSubmit} id="new-patient-form">
                <input onChange={handleChange} id="name" type="text" placeholder="Patient Name" />
                <select onChange={handleChange} name="side-effects" id="side_effects" form="new-patient-form">
                    <option value="Dizziness">Dizziness</option>
                    <option value="nausea">Nausea</option>
                    <option value="Somnambulism">Somnambulism</option>
                    <option value="Memory">Memory</option>
                    <option value="Severe Allergic Reaction">Severe Allergic Reaction</option>
                    <option value="Headache">Headache</option>
                </select>
                <input type="submit" value="Add Patient" />
            </form>
        </>
    )
}

export default NewPatientForm;