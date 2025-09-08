import axios from 'axios';
import type { AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
// Allow configuring long-running timeout; 0 means no timeout
const TIMEOUT_MS = Number(import.meta.env.VITE_API_TIMEOUT_MS ?? 0);

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: isNaN(TIMEOUT_MS) ? 0 : TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
