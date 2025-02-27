import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../context/TokenContext';
import useCrud from '../../hooks/useCrudAxios';
import AlertService from "../../services/notifications/AlertService";

const LoginForm = () => {
  const navigate = useNavigate();
  const { logout: clearUser } = useAuth();
  const { setToken } = useToken();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ login: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { create } = useCrud('login');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await create(credentials);
      
      // Vérification du token dans la réponse
      if (response?.user?.access_token) {
        setToken(response.user.access_token);
        await login(response.user.access_token);
        AlertService.success("Connexion réussie");
        navigate('/', { replace: true });
      } else {
        throw new Error('Token non fourni');
      }
    } catch (err) {
      const errorMessage = err.response?.status === 401
        ? "Email ou mot de passe incorrect"
        : "Une erreur est survenue. Veuillez réessayer.";
      setError(errorMessage);
      AlertService.error(errorMessage);

      // Si le login échoue, on déconnecte l'utilisateur
      clearUser();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="p-10 bg-white rounded-[25px] shadow-[8px_8px_0_-3px_blue] w-[380px] relative overflow-hidden">
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
              name="login"
              type="email"
              autoComplete="login"
              placeholder="Entrez votre email professionnel"
              className="w-full p-3 border border-[#ddd] rounded-lg mb-4 text-sm"
              value={credentials.login}
              onChange={(e) => setCredentials({ ...credentials, login: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-[#333] text-sm">
              Mot de passe <span className="text-red-500">*</span>
            </label>
            <input
              name="password"
              type="password"
              autoComplete="password"
              required
              placeholder="Entrez votre mot de passe"
              className="w-full p-3 border border-[#ddd] rounded-lg mb-4 text-sm"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

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
  );
};

export default LoginForm;
