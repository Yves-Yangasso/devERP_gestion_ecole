import { useState, useCallback, useMemo } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const useCrud = (baseURL) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = useMemo(() => {
    const instance = axios.create({ baseURL: `${API_BASE_URL}/${baseURL}` });

    instance.interceptors.request.use(
      (config) => {
        // Récupérer le token du localStorage
        const token = localStorage.getItem('token'); // Remplacer par la clé de votre token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return instance;
  }, [baseURL]);

  const request = useCallback(async (method, endpoint = '', payload = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api[method](endpoint, payload);
      setData(response.data.data);
      return response.data.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api]);

  const create = useCallback((payload) => request('post', '/', payload), [request]);

  return {
    data,
    loading,
    error,
    create,
  };
};

export default useCrud;
