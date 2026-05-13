import axios from 'axios';

// Troque pelo endereco publico do seu backend Spring Boot (porta 8080)
const BASE_URL = 'http://10.0.2.2:8080'; // Android emulator -> localhost
// Para dispositivo fisico, use o IP da maquina: 'http://192.168.x.x:8080'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
