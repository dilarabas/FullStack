import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState(''); 
  const [countries, setCountries] = useState([]); 
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null); 
  const [multipleResults, setMultipleResults] = useState(false); 
  const [weather, setWeather] = useState(null); 


  const API_URL = 'https://restcountries.com/v3.1/name/';

  const fetchCountries = async () => {
    if (!query) return;

    setIsLoading(true);
    setErrorMessage(''); 
    setMultipleResults(false); 
    setWeather(null); 

    try {
      const response = await fetch(`${API_URL}${query}`);
      if (!response.ok) {
        throw new Error('An error occurred while importing countries');
      }
      const data = await response.json();

      const filteredData = data.filter(country => !country.name.common.toLowerCase().includes('sudan'));

      if (filteredData.length > 10) {
        setErrorMessage('Please make a more specific search.');
        setCountries([]);
        setMultipleResults(true);
      }
      else if (filteredData.length === 1) {
        setCountries(filteredData);
        setMultipleResults(false);
      } 
      else {
        setCountries(filteredData);
        setMultipleResults(false);
      }
    } catch (error) {
      setErrorMessage('An error occurred, please try again.');
      setCountries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeather = async (capital) => {
    if (!capital) return;

    try {
      const response = await fetch(`https://wttr.in/${capital}?format=%C+%t+%w`);
      if (!response.ok) {
        throw new Error('An error occurred while retrieving weather conditions');
      }
      const data = await response.text(); 
      setWeather(data); 
    } catch (error) {
      setWeather(null);
      setErrorMessage('An error occurred while retrieving weather information.');
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchCountries();
  };

  const handleShowDetails = (country) => {
    setSelectedCountry(country);
    fetchWeather(country.capital[0]);
  };

 const getFlagUrl = (country) => {
  if (country.flags && country.flags[0]) {
    console.log("Flag URL: ", country.flags[0]); 
    return country.flags[0]; 
  } else if (country.flags && country.flags[1]) {
    console.log("Flag URL: ", country.flags[1]); 
    return country.flags[1]; 
  } else {
    console.log("No Flag, Using Placeholder.");
    return 'https://via.placeholder.com/100?text=No+Flag'; 
  }
};



  return (
    <div className="App">
      <h1 className="title">Country Information</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Enter a country name..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {isLoading && <p className="loading-text">Loading...</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {countries.length > 0 && countries.length <= 10 && !multipleResults && (
        <div className="country-list">
          {countries.length === 1 ? (
            <div className="country-details">
              <h2>{countries[0].name.common}</h2>
              <img 
                src={getFlagUrl(countries[0])} 
                alt="flag" 
                className="country-flag" 
              />
              <p><strong>Capital city:</strong> {countries[0].capital}</p>
              <p><strong>Area:</strong> {countries[0].area} km²</p>
              <p><strong>Languages:</strong> {Object.values(countries[0].languages || {}).join(', ')}</p>
            </div>
          ) : (
            <ul className="country-list-items">
              {countries.map((country) => (
                <li key={country.cca3} className="country-list-item">
                  <h3>{country.name.common}</h3>
                  <img 
                    src={getFlagUrl(country)} 
                    alt="flag" 
                    className="country-flag" 
                  />
                  <button onClick={() => handleShowDetails(country)} className="show-details-button">
                  Show
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {multipleResults && (
        <p className="multiple-results-warning">Please make a more specific search.
</p>
      )}

      {selectedCountry && (
        <div className="country-details-full">
          <h2>{selectedCountry.name.common} Details</h2>
          <img 
            src={getFlagUrl(selectedCountry)} 
            alt="flag" 
            className="country-flag" 
          />
          <p><strong>Capital city:</strong> {selectedCountry.capital}</p>
          <p><strong>Area:</strong> {selectedCountry.area} km²</p>
          <p><strong>Languages:</strong> {Object.values(selectedCountry.languages || {}).join(', ')}</p>

          {weather ? (
            <div className="weather-info">
              <h3>{selectedCountry.capital[0]} Weather</h3>
              <p>{weather}</p>
            </div>
          ) : (
            <p className="weather-error">No weather information found.
</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
