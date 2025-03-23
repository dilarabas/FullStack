import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

export const getPersons = () => {
  return axios.get(baseUrl).then(response => response.data);
};

export const addPerson = (person) => {
  return axios.post(baseUrl, person).then(response => response.data);
};

export const updatePerson = (id, person) => {
  return axios.put(`${baseUrl}/${id}`, person).then(response => response.data);
};

export const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then(() => id);
};
