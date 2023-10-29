import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3002",
});

const handleRequest = async (requestType, endpoint, data = {}, headers) => {
    try {
        const response = await api[requestType](endpoint, data, { headers });
        return response;
    } catch (error) {
       return error;
    }
};

const get = (endpoint, headers = {}) => handleRequest('get', endpoint, {}, headers);
const post = (endpoint, data, headers = {}) => handleRequest('post', endpoint, data, headers);
const put = (endpoint, data, headers = {}) => handleRequest('put', endpoint, data, headers);
const del = (endpoint, headers = {}) => handleRequest('delete', endpoint, {}, headers);

export {
    get,
    post,
    put,
    del as delete,
};
