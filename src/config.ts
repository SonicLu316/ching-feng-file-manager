export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/eip-api/api';

console.log(`%c[Config] Environment: ${import.meta.env.MODE}`, 'color: #197675; font-weight: bold');
console.log(`%c[Config] API Base URL: ${API_BASE_URL}`, 'color: #197675; font-weight: bold');
