import { ChevronDown } from "lucide-react";
import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToken } from "../../../context/TokenContext";
import AlertService from "../../../services/notifications/AlertService";

function UserButton({ name, role, profile }) {
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
    const { logout } = useAuth();
    const { setNewToken } = useToken();
    const navigate = useNavigate();

    const confirmLogout = async () => {
        try {
            // Appels à la déconnexion
            logout();   // Déconnexion de l'utilisateur
            setNewToken(null);  // Réinitialiser le token

            // Ferme la confirmation de déconnexion
            setShowLogoutConfirmation(false);

            // Redirection vers la page d'accueil ou de connexion
            navigate('/login');  // Ou '/home' selon le flux

            // Affichage de l'alerte de succès
            AlertService.success("Successfully logged out");
        } catch (err) {
            console.error("Erreur de déconnexion :", err);
            AlertService.error("Une erreur s'est produite lors de la déconnexion. Veuillez réessayer.");
        }
    };

    return (
        <>
            <button className="flex items-center gap-3 bg-[#F0ECEC] rounded-full border h-full pr-3 py-1 hover:bg-gray-200 transition-all" onClick={() => setShowLogoutConfirmation(true)}>
                <img
                    src={profile}
                    alt="Profile"
                    className="w-12 h-full rounded-full border-2 border-[#4A76C2]"
                />
                <div>
                    <div className="font-medium">{name}</div>
                    <div className="text-sm text-gray-500">{role}</div>
                </div>
                <ChevronDown size={20} className="text-gray-400" />
            </button>
            {showLogoutConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full text-white">
                        <h2 className="text-xl font-bold mb-4">Confirmer la déconnexion</h2>
                        <p className="text-gray-300 mb-6">Êtes-vous sûr de vouloir vous déconnecter ?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowLogoutConfirmation(false)}
                                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={confirmLogout}
                                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                            >
                                Déconnexion
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserButton;
