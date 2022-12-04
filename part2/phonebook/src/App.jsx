import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import People from "./components/People";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Notification from "./components/Notification";

import phonebookService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [messageClass, setMessageClass] = useState(null);

  const [filteredNames, setFilteredNames] = useState([]);

  useEffect(() => {
    axios.get(phonebookService.baseUrl).then((res) => {
      setPersons(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageClass={messageClass}/>
      <Filter data={persons} setFilter={setFilteredNames} />
      <h2>add a new person</h2>
      <Form
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
        message={message}
        setMessage={setMessage}
        setMessageClass={setMessageClass}
      />

      <h2>Numbers</h2>
      <People
        persons={filteredNames.length ? filteredNames : persons}
        setPersons={setPersons}
        setMessage={setMessage}
        setMessageClass={setMessageClass}
      />
    </div>
  );
};

export default App;
