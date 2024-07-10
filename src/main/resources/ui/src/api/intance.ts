import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:50000',
    headers: {
        'Content-Type': 'application/json',
    },
});
