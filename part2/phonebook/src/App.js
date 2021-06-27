import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Components/filter'
import Persons from './Components/persons'
import PersonForm from './Components/personform'


const App = () => {
  const [ persons, setPersons ] = useState([
    // { name: 'Arto Hellas', number: '040-123456' },
    // { name: 'Ada Lovelace', number: '39-44-5323523' },
    // { name: 'Dan Abramov', number: '12-43-234345' },
    // { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filterName, setFilterName] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.indexOf(newName) !== -1){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      const nameObject = {
        name: newName,
        number: newNumber
      }
      
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const filtered = persons.filter((person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName = {filterName} setFilterName = {setFilterName} />
      <PersonForm addPerson = {addPerson} 
        newName = {newName}
        newNumber = {newNumber}
        handleNameChange = {handleNameChange}
        handleNumberChange = {handleNumberChange} />
      <h2>Numbers</h2>
      <Persons filtered = {filtered} />
      
    </div>
  )
}

export default App