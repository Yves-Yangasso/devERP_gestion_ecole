import React, { useState, useEffect } from 'react';
import AuthService from '../../services/AuthService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../context/TokenContext';
import useCrud from '../../hooks/useCrudAxios';
import AlertService from "../../services/notifications/AlertService";

const LoginForm = () => {
  const { login: setUser, logout: clearUser } = useAuth();
  const { setToken, getToken, clearToken } = useToken();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { create } = useCrud('login');

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      if (token && !isAuthenticated) {
        try {
          await loadUserData(token);
          setIsAuthenticated(true);
          navigate('/');
          AlertService.success("Vous êtes maintenant connecté");
        } catch (err) {
          handleLogout();
          await AlertService.error("Vous avez été déconnecté");
        }
      }
    };
    checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getToken, isAuthenticated]);

  const loadUserData = async (token) => {
    try {
      const user = await create();
      setUser(user);
      if (user.role !== 'USER') {
      }
    } catch (error) {
      throw new Error('Failed to load user data');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // Empêcher le comportement par défaut du formulaire
  
    setLoading(true);
    setError(null);
  
    try {
      const data = await AuthService.login(credentials.email, credentials.password);
      if (data.token) {
        setToken(data.token);
      } else {
        throw new Error('Le token n\'a pas été fourni');
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      await loadUserData(data.token);
      setIsAuthenticated(true);
      navigate('/');
      AlertService.success("Connexion réussie");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Email ou mot de passe incorrect");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
      AlertService.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleLogout = () => {
    AlertService.success("Déconnexion réussie");
    clearToken();
    clearUser();
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className=" p-10 bg-white rounded-[25px] shadow-[8px_8px_0_-3px_blue] w-[380px] relative overflow-hidden">
        {/* Effet wave en haut à droite */}
        <div className="absolute top-0 right-0 w-[200px] h-[200px] opacity-10 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-full h-full"
            style={{
              background:
                "repeating-linear-gradient(45deg, transparent, transparent 10px, #0047AB 10px, #0047AB 11px)",
              transform: "rotate(-10deg)",
            }}
          ></div>
        </div>

        {/* Logo */}
        <div className="flex items-center mb-4">
          <img
            src="/images/Isi_Logo.png"
            alt="ISI SUPTECH"
            className="w-28 h-auto"
          />
        </div>

        {/* Texte de bienvenue */}
        <p className="text-sm mb-2">
          Bienvenue sur <span className="text-[#0047AB]">ISI SUPTECH</span>
        </p>

        {/* Titre */}
        <h2 className="text-2xl text-black mb-6 font-normal">Se connecter</h2>

        {/* Formulaire */}
        <form>
          <div className="mb-4">
            <label className="block mb-2 text-[#333] text-sm">
              Email Professionnel <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Entrez votre email professionnel"
              className="w-full p-3 border border-[#ddd] rounded-lg mb-4 text-sm"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-[#333] text-sm">
              Mot de passe <span className="text-red-500">*</span>
            </label>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Entrez votre mot de passe"
              className="w-full p-3 border border-[#ddd] rounded-lg mb-4 text-sm"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full p-3 bg-[#0047AB] text-white rounded-lg cursor-pointer text-sm mt-4"
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
          <div className="text-right mt-2">
            <a href="/" className="text-[#0047AB] no-underline text-xs">
              Mot de passe oublié ?
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm;