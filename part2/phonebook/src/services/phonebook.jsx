import axios from "axios";
const baseUrl = "http://localhost:8001/persons";

const getAll = () => {
    const req = axios.get(baseUrl);
    return req.then(res => res.data);
}

const create = (newPerson) => {
    const req = axios.post(baseUrl, newPerson);
    return req.then(res => res.data)
}

const update = (id, newPerson) => {
    const req = axios.put(`${baseUrl}/${id}`, newPerson);
    return req.then(res => res.data)
}

const deletePerson = (id) => {
    const req = axios.delete(`${baseUrl}/${id}`);
    return req.then(res => res.data);
}

// const getAll = () => {
//   const request = axios.get(baseUrl);
//   return request.then((response) => response.data);
// };

// const create = (newObject) => {
//   const request = axios.post(baseUrl, newObject);
//   return request.then((response) => response.data);
// };

// const update = (id, newObject) => {
//   const request = axios.put(`${baseUrl}/${id}`, newObject);
//   return request.then((response) => response.data);
// };

export default { getAll, create, update, deletePerson };