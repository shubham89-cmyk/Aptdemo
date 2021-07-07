import axios from 'axios';
import Service from './ServiceUtil'


const axiosObj = axios.create({baseURL: "https://api.appetizar.io/api"})

export const LoginApi = async (loginReq) => {
    const url = 'auth/login'
    const response = await axiosObj.post(url, loginReq);
    console.log(response)
    return response;
}