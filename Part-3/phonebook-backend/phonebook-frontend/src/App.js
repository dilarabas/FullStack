import React, { useState, useEffect } from 'react';
import './App.css'; // İsteğe bağlı stil dosyası

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const apiBaseUrl = 'http://localhost:3001/api/persons'; // **KESİN VE DOĞRU URL**

  useEffect(() => {
    fetch(apiBaseUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setPersons(data))
      .catch(error => {
        console.error('Veri alınırken bir hata oluştu:', error);
        setErrorMessage('Telefon rehberi yüklenirken bir hata oluştu.');
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    fetch(apiBaseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPerson),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || 'Bilinmeyen hata'}`);
          });
        }
        return response.json();
      })
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson));
        setNewName('');
        setNewNumber('');
        setErrorMessage(null);
      })
      .catch(error => {
        console.error('Kişi eklenirken bir hata oluştu:', error);
        setErrorMessage(error.message); // Sadece sunucudan gelen hata mesajını göster
      });
  };

  const handleDeletePerson = (id) => {
    fetch(`${apiBaseUrl}/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.status === 204) {
          setPersons(persons.filter(person => person.id !== id));
          setErrorMessage(null);
        } else {
          console.error('Kişi silinirken bir hata oluştu:', response.status);
          setErrorMessage(`Kişi silinirken bir hata oluştu: Durum kodu ${response.status}`);
        }
      })
      .catch(error => {
        console.error('Kişi silinirken bir hata oluştu:', error);
        setErrorMessage(`Kişi silinirken bir hata oluştu: ${error.message}`);
      });
  };

  return (
    <div>
      <h2>Telefon Rehberi</h2>

      {errorMessage && <div className="error">{errorMessage}</div>}

      <ul>
        {persons.map(person => (
          <li key={person.id}>
            {person.name} - {person.number}
            <button onClick={() => handleDeletePerson(person.id)}>Sil</button>
          </li>
        ))}
      </ul>

      <h3>Yeni Kişi Ekle</h3>
      <form onSubmit={handleAddPerson}>
        <div>
          Ad: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Numara: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <button type="submit">Ekle</button>
      </form>
    </div>
  );
}

export default App;