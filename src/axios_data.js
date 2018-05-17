import axios from 'axios';
import Qs from 'qs';

const instance = axios.create({
    baseURL: __dirname,
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    transformRequest: [function (data) { data = Qs.stringify(data); return data }]
})

export default instance;