import axios from 'axios';

const baseURL = 'http://localhost:44331';

const greenPointsApi = axios.create({ baseURL });

export default greenPointsApi;