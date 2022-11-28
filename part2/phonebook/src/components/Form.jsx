import phonebookService from "../services/phonebook";

const Form = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  persons,
  setPersons,
  message,
  setMessage
}) => {
  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  };

  const addEntry = (e) => {
    e.preventDefault();
    const newEntry = persons.filter((person) => person.name === newName)[0]
    if (newEntry) {
      if(confirm(`${newName} is already added to the phonebook. Replace old number with new one?`)) {
        const updatedPerson = {...newEntry, number: newNumber}
        let id = newEntry.id;
        phonebookService
        .update(id, updatedPerson)
        .then(update => {
            setPersons(persons.map(person => person.id !== id ? person : update))
            setMessage(`${update.name}'s number was updated`)
            setMessageClass('positive-message')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        })
        return
      } else {
        setNewName('')
        setNewNumber('')
        return
      }
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    phonebookService.create(newPerson).then((res) => {
      setPersons(persons.concat(res));
      setMessage(`${res.name} was added`)
      setTimeout(() => {
          setMessage(null)
      }, 5000)
      setNewName("");
      setNewNumber("");
    });
  };
  return (
    <form onSubmit={addEntry}>
      <div>
        name: <input type="text" value={newName} onChange={handleNameInput} />
      </div>
      <div>
        number:
        <input
          type="tel"
          value={newNumber}
          onChange={handleNumberInput}
          pattern="[\d-]+"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
