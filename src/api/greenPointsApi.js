import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const baseURL = 'http://localhost:44331';

const greenPointsApi = axios.create({ baseURL });

greenPointsApi.interceptors.request.use(
    async(config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            console.log(token);
            config.headers['Accept'] = 'application/json';
            config.headers['Authorization'] = `Bearer ${ token }`;
        }

        return config;
    }
);

export default greenPointsApi;