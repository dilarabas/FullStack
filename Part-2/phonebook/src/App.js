import { useState } from 'react';
import './App.css';  

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();  

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = { name: newName, number: newNumber, id: persons.length + 1 };
    setPersons(persons.concat(newPerson));

    setNewName('');
    setNewNumber('');
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for a name..."
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div>
            Name: 
            <input 
              value={newName} 
              onChange={handleNameChange} 
            />
          </div>
          <div>
            Number: 
            <input 
              value={newNumber} 
              onChange={handleNumberChange} 
            />
          </div>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>

      {/* Debugging: Girişteki değerleri kontrol et */}
      <div className="debug">debug: {newName} - {newNumber}</div>

      <h2>Numbers</h2>

      {/* Telefon rehberindeki kişileri listele */}
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>{person.name}: {person.number}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
