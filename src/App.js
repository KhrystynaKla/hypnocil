import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import NewPatientForm from './components/NewPatientForm';
import PatientList from './components/PatientList';
import React, {useState} from "react"
import Patient from './components/Patient';

function App() {
  const [patients, setPatients]=useState([])
  const [searchText, setSearchText]=useState('')

  useEffect(()=>{
    fetch('http://localhost:4001/patients')
    .then(res=>res.json())
    .then(data=>setPatients(data))
  },[])

  function addPatient (patient){
    fetch('http://localhost:4001/patients',{
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify(patient)
    })
    .then(res=>res.json())
    .then(data=> setPatients([...patients, data]))
  }

  function handleSearch(value){
    setSearchText(value)
  }

  function handleDelete(pat){
    console.log(pat)
    fetch(`http://localhost:4001/patients/${pat.id}`,{
      method: 'DELETE'
    })
    setPatients(patients.filter(pati=>{
      if(pati.id===pat.id) return false;
      return true
    }))
  }

  let filterred = patients.filter(pat=>{
    if(searchText==='') return true;
    return (pat.name.toLowerCase().includes(searchText.toLowerCase()) || pat.side_effects.includes(searchText.toLowerCase()))
  })

  function handleDeceased(patient){
    fetch(`http://localhost:4001/patients/${patient.id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
            'Accept': "application/json"
        },
        body: JSON.stringify({deceased: !patient.deceased})
    })
    .then(res=>res.json())
    .then(data=>setPatients(patients.map(pat=>{
      if (pat.id===data.id) return data;
      return pat
    })))
  }
  
  function handleAddSide (event, patient){
    let sideEffects=patient.side_effects
    fetch(`http://localhost:4001/patients/${patient.id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
            'Accept': "application/json"
        },
        body: JSON.stringify({side_effects: [...sideEffects,  event.target.value]})
    })
    .then(res=>res.json())
    .then(data=>setPatients(patients.map(pat=>{
      if (pat.id===data.id) return data;
      return pat
    })))
  }


  return (
    <div className="root">
      <Header handleSearch={handleSearch}/>
      <div className="content">
        <NewPatientForm addPatient={addPatient}/>
        <PatientList handleAddSide={handleAddSide} handleDeceased={handleDeceased} patients={filterred} handleDelete={handleDelete}/>
      </div>
    </div>
  );
}

export default App;
