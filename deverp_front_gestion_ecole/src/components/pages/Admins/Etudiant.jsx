import React from 'react';
import PopupLayout from '../../formulaire/PopupLayout';
import { CalendarIcon, ChevronDownIcon } from 'lucide-react';
// Exemple d'utilisation
const Etudiant = () => {
    
    const tabs = [
        "Etudiants",
        "Frais & mensualités",
        "Paiements",
        "Recettes constatés"
    ];

    return (
        <PopupLayout
            title="Ajouter une nouvelle inscription"
            activeTab={1}
            tabs={tabs}
            onClose={() => console.log('Fermer')}
            onPrevClick={() => console.log('Précédent')}
            onNextClick={() => console.log('Suivant')}
            prevText="Précédent"
            nextText="Suivant"
            buttonType="button"
        >
            <div className="p-6 mx-auto shadow-md bg-white rounded-2xl">
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg
                                viewBox="0 0 24 24"
                                className="w-5 h-5 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-medium">Informations de l'étudiant</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Nom Complet
                            </label>
                            <input
                                type="text"
                                placeholder="Prénom et Nom"
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Téléphone
                            </label>
                            <input
                                type="tel"
                                placeholder="+221 XX XXX XX XX"
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Date de Naissance
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="JJ/MM/AAAA"
                                    className="w-full p-2 border rounded-lg"
                                />
                                <CalendarIcon className="w-5 h-5 absolute right-3 top-2.5 text-gray-400" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Adresse
                            </label>
                            <input
                                type="text"
                                placeholder="Adresse Complet"
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Niveau d'Études
                            </label>
                            <div className="relative">
                                <select className="w-full p-2 border rounded-lg appearance-none bg-gray-100">
                                    <option>Veuillez choisir parmi ces options</option>
                                </select>
                                <ChevronDownIcon className="w-5 h-5 absolute right-3 top-2.5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="p-6">
        <div class="bg-blue-50 rounded-xl p-6">
            <div class="flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.342a2 2 0 0 0-.602-1.43l-4.44-4.342A2 2 0 0 0 13.56 2H6a2 2 0 0 0-2 2z"/>
                    <path d="M9 13h6"/>
                    <path d="M9 17h3"/>
                </svg>
                <h2 class="text-lg font-medium">Documents Requis</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                    <input type="checkbox" class="w-4 h-4 rounded border-gray-300"/>
                    <span>Copie CNI/Passeport Légalisée</span>
                </div>

                <div class="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                    <input type="checkbox" class="w-4 h-4 rounded border-gray-300"/>
                    <span>Dernier Diplôme</span>
                </div>

                <div class="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                    <input type="checkbox" class="w-4 h-4 rounded border-gray-300"/>
                    <span>2 Photo d'Identité</span>
                </div>

                <div class="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                    <input type="checkbox" class="w-4 h-4 rounded border-gray-300"/>
                    <span>Bulletins de notes de l'année dernier</span>
                </div>

                <div class="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                    <input type="checkbox" class="w-4 h-4 rounded border-gray-300"/>
                    <span>Certificat de Scolarité</span>
                </div>

                <div class="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                    <input type="checkbox" class="w-4 h-4 rounded border-gray-300"/>
                    <span>Certificat de Residence</span>
                </div>
            </div>
        </div>
    </div>
            
        </PopupLayout>
    );
};

export default Etudiant;