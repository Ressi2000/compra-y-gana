import axios from 'axios';

export const getDolar = async (req, res) => {
    const url = 'https://pydolarvenezuela-api.vercel.app/api/v1/dollar/unit/bcv';
    const response = await axios.get(url);
    console.log(response.data)
    res.json(response.data);
}

export const getDolarForm = async (req, res) => {
    const url = 'https://pydolarvenezuela-api.vercel.app/api/v1/dollar/unit/bcv';
    const response = await axios.get(url);
    //console.log(response.data)
    return response.data;
}