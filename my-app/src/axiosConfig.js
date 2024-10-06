import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://employee-list-crud-mern.vercel.app/api',
});

export default instance;
