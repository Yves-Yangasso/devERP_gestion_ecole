import { useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTokenService } from '../utils/tokenUtils';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const useCrudAxios = (baseURL) => {
    const { getToken } = useTokenService();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const queryClient = useQueryClient();

    const api = useMemo(() => {
        const instance = axios.create({
            baseURL: `${API_BASE_URL}/${baseURL}`,
            headers: {
                'Accept': 'application/json'
            }
        });

        instance.interceptors.request.use(
            config => {
                const token = getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                if (config.data instanceof FormData) {
                    config.headers['Content-Type'] = 'multipart/form-data';
                } else {
                    config.headers['Content-Type'] = 'application/json';
                }
                return config;
            },
            error => Promise.reject(error)
        );

        return instance;
    }, [baseURL, getToken]);

    const request = useCallback(async (method, endpoint = '', payload = null) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api[method](endpoint, payload);
            console.log(response);
            setData(response.data);
            return response.data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [api]);

    const fetchData = async () => {
        return request('get');
    };

    const { data: queryData, isLoading, error: queryError, refetch } = useQuery({
        queryKey: [baseURL],
        queryFn: fetchData,
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: !!baseURL,
        onSuccess: (data) => {
            setData(data);
        },
        onError: (error) => {
            console.error("Erreur lors du fetch des données :", error);
            setError(error);
        },
    });

    const removeMutation = useMutation({
        mutationFn: (id) => request('delete', `/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries([baseURL]);
        },
        onError: (error) => {
            console.error("Erreur lors de la suppression :", error);
            setError(error);
        },
    });

    const get = useCallback((id = '') => request('get', `/${id}`), [request]);
    const create = useCallback((payload) => request('post', '', payload), [request]);
    const update = useCallback((id, payload) => request('put', `/${id}`, payload), [request]);
    const remove = useCallback((id) => removeMutation.mutate(id), [removeMutation]);

    return {
        data: queryData || data,
        loading: isLoading || loading,
        error: queryError || error,
        get,
        create,
        update,
        remove,
        refetch,
    };
};

export default useCrudAxios;
