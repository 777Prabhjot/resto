import axios from "axios";

const baseUrl = "http://localhost:5000";


export const Login = async (payload) => {
    return await axios.post(`${baseUrl}/login`, payload)
    .then(response => response)
    .catch(error => error)
}
