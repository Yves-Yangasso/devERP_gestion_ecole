import { useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTokenService } from '../utils/tokenUtils'; // Import du service pour récupérer le token

const API_BASE_URL = process.env.REACT_APP_API_URL;

const useCrud = (baseURL) => {
    const { getToken } = useTokenService(); // Utilisation du service pour récupérer le token
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const queryClient = useQueryClient();

    // Créer une instance axios avec un intercepteur pour ajouter le token
    const api = useMemo(() => {
        const instance = axios.create({ 
            baseURL: `${API_BASE_URL}/${baseURL}`,
            headers: {
                'Accept': 'application/json'
            }
        });

        instance.interceptors.request.use(
            config => {
                const token = getToken(); // Récupère le token depuis le contexte
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`; // Ajouter le token aux en-têtes de la requête
                }

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
    }, [baseURL, getToken]);

    // Fonction générique pour envoyer les requêtes
    const request = useCallback(async (method, endpoint = '', payload = null) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api[method](endpoint, payload);
            setData(response.data);
            return response.data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [api]);

    // Requête de récupération des données (uniquement GET)
    const fetchData = async () => {
        return request('get');
    };

    const { data: queryData, isLoading, error: queryError, refetch } = useQuery({
        queryKey: [baseURL],  // Clé de cache pour cette requête
        queryFn: fetchData,   // Fonction de récupération des données
        staleTime: 1000 * 60 * 5, // Cache les données pendant 5 minutes
        refetchInterval: 1000 * 60, // Vérifie les nouvelles données toutes les 60 secondes (1 min)
        refetchIntervalInBackground: true, // Continue à rafraîchir les données en arrière-plan
        refetchOnWindowFocus: false, // Ne rafraîchit pas lorsque l'utilisateur revient sur l'onglet
        refetchOnReconnect: false, // Ne rafraîchit pas lors d'une reconnexion internet
        enabled: !!baseURL, // S'assure que la requête ne s'exécute que si baseURL est défini
        onSuccess: (data) => {
            setData(data);  // Met à jour l'état local avec les données mises en cache
        },
        onError: (error) => {
            console.error("Erreur lors du fetch des données :", error);
            setError(error);  // Gère l'erreur si nécessaire
        },
    });

    // Mutation pour la suppression de données
    const removeMutation = useMutation({
        mutationFn: (id) => request('delete', `/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries([baseURL]);  // Actualiser les données après suppression
        },
        onError: (error) => {
            console.error("Erreur lors de la suppression :", error);
            setError(error);  // Gérer l'erreur de suppression
        },
    });

    // Fonctions CRUD
    const get = useCallback((id = '') => request('get', `/${id}`), [request]);
    const create = useCallback((payload) => request('post', '/', payload), [request]);
    const update = useCallback((id, payload) => request('put', `/${id}`, payload), [request]);
    const remove = useCallback((id) => removeMutation.mutate(id), [removeMutation]);

    return {
        data: queryData || data, // Renvoie soit les données mises en cache, soit les données locales
        loading: isLoading || loading,  // Combine le loading de React Query et celui local
        error: queryError || error,    // Combine les erreurs de React Query et locales
        get,
        create,
        update,
        remove,
        refetch,  // Permet de rafraîchir les données manuellement
    };
};

export default useCrud;
