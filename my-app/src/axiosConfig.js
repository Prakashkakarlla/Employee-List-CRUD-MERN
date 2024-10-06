import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://employee-list-crud-mern-jneezbt8a-prakashkakarllas-projects.vercel.app/api',
});

export default instance;
