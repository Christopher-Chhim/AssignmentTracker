import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', 
});

API.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

export default API;