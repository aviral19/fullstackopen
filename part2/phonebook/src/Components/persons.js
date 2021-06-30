import React, {useEffect} from "react";
import personService from "../personService";
import Person from './person'


const Persons = ({persons, setPersons, filterName, message, setMessage }) => {

  useEffect(() => {
    personService.getAll().then(persons => {
      setPersons(persons)
    })
  }, [setPersons])

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name} ?`)){
      personService.deletePerson(person.id).then(() => {
        personService.getAll()
        .then(personObjects => {
          setPersons(personObjects)
        })
      })
      .catch((error) => {
        console.log(error)
        setMessage({message: `Information of ${person.name} has already been removed from server`, className: 'error'})
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      })
    }
  }

  return (
    <div>
      {persons
          .filter(person => person.name.search(new RegExp(filterName, 'i')) !== -1)
          .map(person => <Person key={person.id} person={person} deletePerson={() => deletePerson(person)}/>)
      }
    </div>
  );
};

export default Persons;