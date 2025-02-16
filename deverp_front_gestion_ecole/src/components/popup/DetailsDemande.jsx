// DetailsDemande.jsx
import React, { useState } from 'react';
import { X, User, Users, FileText, MapPin, Phone, Mail, Briefcase, Calendar, Flag, Building } from 'lucide-react';
import DocumentsSection from '../Documents/DocumentsSection';

const DetailsDemande = ({ dossier, onClose }) => {
    const [activeTab, setActiveTab] = useState('student');
    if (!dossier) return null;

    const tabs = [
        { id: 'student', label: 'Informations Étudiant', icon: <User className="w-5 h-5" /> },
        { id: 'tutors', label: 'Tuteurs', icon: <Users className="w-5 h-5" /> },
        { id: 'documents', label: 'Documents', icon: <FileText className="w-5 h-5" /> },
    ];

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl relative">
                {/* Header */}
                <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-xl">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Dossier de {dossier.prenom} {dossier.nom}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                </div>

                {/* Navigation Tabs */}
                <div className="flex border-b bg-gray-50">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors relative
                                ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
                        >
                            {tab.icon}
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Student Information Tab */}
                    {activeTab === 'student' && (
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2 bg-blue-50 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                                    <Building className="w-5 h-5" />
                                    Formation
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <InfoItem label="Niveau" value={dossier.niveau} />
                                    <InfoItem label="Formation" value={dossier.formation_superieure} />
                                    <InfoItem label="Spécialité" value={dossier.specialites} />
                                    <InfoItem label="Dernier Établissement" value={dossier.dernier_etablissement} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-blue-800">Informations Personnelles</h3>
                                <InfoItem icon={<User />} label="Nom Complet" value={`${dossier.prenom} ${dossier.nom}`} />
                                <InfoItem icon={<Calendar />} label="Date de Naissance" value={dossier.date_naissance} />
                                <InfoItem icon={<MapPin />} label="Lieu de Naissance" value={dossier.lieu_naissance} />
                                <InfoItem icon={<Flag />} label="Nationalité" value={dossier.nationalite} />
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-blue-800">Contact</h3>
                                <InfoItem icon={<MapPin />} label="Adresse" value={dossier.adresse} />
                                <InfoItem icon={<Phone />} label="Téléphone" value={dossier.telephone} />
                                <InfoItem icon={<Mail />} label="Email" value={dossier.email} />
                            </div>
                        </div>
                    )}

                    {/* Tutors Tab */}
                    {activeTab === 'tutors' && (
                        <div className="grid gap-6">
                            {dossier.tuteur && (
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-blue-800 mb-4">Tuteur</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <InfoItem icon={<User />} label="Nom Complet" value={`${dossier.tuteur.prenom} ${dossier.tuteur.nom}`} />
                                        <InfoItem icon={<Phone />} label="Téléphone" value={dossier.tuteur.telephone} />
                                        <InfoItem icon={<Mail />} label="Email" value={dossier.tuteur.email} />
                                        <InfoItem icon={<MapPin />} label="Adresse" value={dossier.tuteur.adresse} />
                                        <InfoItem icon={<Briefcase />} label="Fonction" value={dossier.tuteur.fonctions} />
                                        <InfoItem icon={<User />} label="Statut" value={dossier.tuteur.statut} />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Documents Tab */}
                    {activeTab === 'documents' && (
                        <div className="grid gap-4">
                            <div className="mt-6 p-6 bg-blue-100 rounded-lg shadow-lg">
                                <h4 className="font-bold text-lg text-blue-600 mb-4">📄 Documents</h4>
                                {dossier.dossier && dossier.dossier[0] && dossier.dossier[0].documents && (
                                    <DocumentsSection documents={dossier.dossier[0].documents} />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-start gap-3">
        {icon && <div className="text-blue-600 mt-1">{icon}</div>}
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-medium text-gray-900">{value}</p>
        </div>
    </div>
);

export default DetailsDemande;
