import phonebookService from "../services/phonebook";

const People = ({ persons, setPersons, setMessage, setMessageClass  }) => {
  const deletePerson = (id, name) => {
    if (confirm(`Are you sure you want to delete ${name}`)) {
      phonebookService
        .deletePerson(id)
        .then(setPersons(persons.filter((p) => p.id !== id)))
        .catch(err => {
          setMessageClass('error-message')
          setMessage(`${name} was already deleted`)
          setPersons(persons.filter(p => p.id !== id))
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  };
  return (
    <section>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name}: {person.number}{" "}
          <button onClick={() => deletePerson(person.id, person.name)}>
            delete
          </button>
        </p>
      ))}
    </section>
  );
};

export default People;
