import { useState } from "react";

function DoubleButton({ onTabChange }) {
    const [activeTab, setActiveTab] = useState("students");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        onTabChange(tab); // 🔥 Notifie le parent du changement d'onglet
    };

    return (
        <div className="flex gap-1 border rounded-lg p-1 font-bold bg-white shadow-lg">
            <button
                className={`px-4 py-2 rounded-md ${
                    activeTab === "students" ? "bg-[#4A76C2] text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => handleTabClick("students")}
            >
                Etudiants
            </button>
            <button
                className={`px-4 py-2 rounded-md ${
                    activeTab === "demandes" ? "bg-[#4A76C2] text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => handleTabClick("demandes")}
            >
                Demandes
            </button>
        </div>
    );
}

export default DoubleButton;
