import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Components/filter'
import Persons from './Components/persons'
import PersonForm from './Components/personform'
import personService from './personService'

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
    // console.log('effect')
    personService
      .getAll()
      .then(person => {
        setPersons(person)
      })
    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(response => {
    //     console.log('promise fulfilled')
    //     setPersons(response.data)
    //   })
  }, [])

  const updatePerson = (existingPersonID,nameObject) => {
    if (window.confirm(`${nameObject.name} is already added to phonebook.
    replace the old number with new one?`)){
      console.log(nameObject.name)
      console.log(nameObject.number)
      console.log(existingPersonID)
      personService
        .updatePerson(existingPersonID, nameObject)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.map(person => person.id !== existingPersonID ? person : returnedPerson))
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    if(persons.find((person) => person.name === newName)){
      const existingPerson = persons.find((person) => person.name === newName)
      // console.log('reaches here')
      updatePerson(existingPerson.id, nameObject)
    }
    else{
      personService
        .createPerson(nameObject)
        .then(person => {
          setPersons(persons.concat(person))
        })
      // axios
      //   .post('http://localhost:3001/persons', nameObject)
      //   .then(response => {
      //     console.log(response.data)
      //     setPersons(persons.concat(response.data))
      //   })
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

  // const filtered = persons.filter((person) =>
  //   person.name.toLowerCase().includes(filterName.toLowerCase())
  // );

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
      <Persons persons = {persons} setPersons = {setPersons} filterName = {filterName} />
      
    </div>
  )
}

export default App