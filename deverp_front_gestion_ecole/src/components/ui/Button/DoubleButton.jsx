import { useState } from "react";

function DoubleButton({ labels = ["Option 1", "Option 2"], values = ["value1", "value2"], onTabChange }) {
    const [activeTab, setActiveTab] = useState(values[0]); // Par défaut, active le premier bouton

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        onTabChange(tab); // 🔥 Notifie le parent du changement d'onglet
    };

    return (
        <div className="flex gap-1 border rounded-lg p-1 font-bold bg-white shadow-lg">
            {labels.map((label, index) => (
                <button
                    key={index}
                    className={`px-4 py-2 rounded-md ${
                        activeTab === values[index] ? "bg-[#4A76C2] text-white" : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => handleTabClick(values[index])}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}

export default DoubleButton;
