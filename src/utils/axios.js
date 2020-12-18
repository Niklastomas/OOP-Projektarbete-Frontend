import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:44372/',
});

export default instance;
