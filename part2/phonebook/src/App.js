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
  const [ message, setMessage] = useState(null)

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

  const UpdateMessage = ({ notify }) => {
    if(notify === null){
      return null
    }
    const {message, className} = notify
    let messageStyle = {}
    if(className === 'update'){
      messageStyle = {
        color: 'green',
        fontSize: 20,
        background: 'lightgrey',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
      }
    }
    else{
      messageStyle = {
        color: 'red',
        fontSize: 20,
        background: 'lightgrey',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
      }
    }
    return (
      <div style = {messageStyle}>
        {message}
      </div>
    )
  }



  const updatePerson = (existingPersonID,nameObject) => {
    if (window.confirm(`${nameObject.name} is already added to phonebook.
    replace the old number with new one?`)){
      personService
        .updatePerson(existingPersonID, nameObject)
        .then(returnedPerson => {
          setMessage({message: `Added ${newName}`, className: 'update'})
          setPersons(persons.map(person => person.id !== existingPersonID ? person : returnedPerson))
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        })
        .catch((error) => {
          setMessage({message: `Information of ${nameObject.name} has already been removed from server`, className: 'error'})
          setTimeout(() => {
            setMessage(null)
          }, 5000);
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
          setMessage({message: `Added ${newName}`, className: 'update'})
          setPersons(persons.concat(person))
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        })
        .catch((error) => {
          console.log(error.response.data.error)
          setMessage({message: error.response.data.error})
          setTimeout(() => {
            setMessage(null)
          }, 5000);
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
      <UpdateMessage notify = {message} />
      <Filter filterName = {filterName} setFilterName = {setFilterName} />
      <PersonForm addPerson = {addPerson} 
        newName = {newName}
        newNumber = {newNumber}
        handleNameChange = {handleNameChange}
        handleNumberChange = {handleNumberChange} 
        />
      <h2>Numbers</h2>
      <Persons persons = {persons} setPersons = {setPersons} filterName = {filterName}
      message = {message}
      setMessage = {setMessage} />
      
    </div>
  )
}

export default App