import axios from "axios";

const baseUrl = "http://localhost:5000";
const getToken = typeof window !== "undefined" ? localStorage.getItem('token') : '';

const Authaxios = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: `Bearer ${getToken}`
    }
});

export const getAllOrders = async () => {
    const response = await Authaxios.get('/ordersByUser');
    return response.data.results;
}

export const placeOrder = async ({name, image, price, quantity}) => {
    const response = await Authaxios.post('/placeOrder', {name, image, price, quantity});
    return response.data;
}