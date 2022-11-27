import phonebookService from "../services/phonebook";

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

  export default Filter