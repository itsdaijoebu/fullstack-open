import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'

const People = ({ persons }) => {
  return (
    <section>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name}: {person.number}
        </p>
      ))}
    </section>
  );
};

const Filter = ({ data, setFilter }) => {
  const filterNames = (e) => {
    const filtered = data.filter((person) =>
      person.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilter(filtered);
  };

  return (
    <section>
      <label>filter shown with</label>
      <input type="text" onChange={filterNames} />
    </section>
  );
};

const Form = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  persons,
  setPersons,
}) => {
  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  };

  const addEntry = (e) => {
    e.preventDefault();
    if (persons.filter((person) => person.name === newName).length) {
      return alert(`${newName} is already added to the phonebook`);
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };
  return (
    <form onSubmit={addEntry}>
      <div>
        name: <input type="text" value={newName} onChange={handleNameInput} />
      </div>
      <div>
        number:
        <input type="tel" value={newNumber} onChange={handleNumberInput} pattern="[\d-]+" />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [filteredNames, setFilteredNames] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8001/persons').then(res => {
      setPersons(res.data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter data={persons} setFilter={setFilteredNames} />
      <h2>add a new</h2>
      <Form
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
      />

      <h2>Numbers</h2>
      <People persons={filteredNames.length ? filteredNames : persons} />
    </div>
  );
};

export default App;
