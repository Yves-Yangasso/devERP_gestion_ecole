import { useState, useCallback, useMemo } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const useCrud = (baseURL) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const api = useMemo(() => {
        const instance = axios.create({ 
            baseURL: `${API_BASE_URL}/${baseURL}`,
            headers: {
                'Accept': 'application/json'
            }
        });

        instance.interceptors.request.use(
            config => {
                // Si les données sont FormData, on laisse le navigateur gérer le Content-Type
                if (config.data instanceof FormData) {
                    config.headers['Content-Type'] = 'multipart/form-data';
                } else {
                    config.headers['Content-Type'] = 'application/json';
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );

        return instance;
    }, [baseURL]);

    const request = useCallback(async (method, endpoint = '', payload = null) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api[method](endpoint, payload, {
                // Pour le débogage, on peut voir la progression de l'upload
                onUploadProgress: progressEvent => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log(`Upload Progress: ${percentCompleted}%`);
                }
            });
            setData(response.data.data);
            return response.data.data;
        } catch (err) {
            setError(err);
            console.error('Request error:', err.response?.data || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [api]);

    const get = useCallback((id = '') => request('get', `/${id}`), [request]);
    const create = useCallback((payload) => request('post', '/', payload), [request]);
    const update = useCallback((id, payload) => request('put', `/${id}`, payload), [request]);
    const remove = useCallback((id) => request('delete', `/${id}`), [request]);

    return {
        data,
        loading,
        error,
        get,
        create,
        update,
        remove,
    };
};

export default useCrud;