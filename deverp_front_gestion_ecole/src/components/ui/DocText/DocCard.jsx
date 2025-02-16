import React from "react";
import { FileText } from 'lucide-react';

const DocCard = ({ title, label }) => {
    return (
        <div className="px-4 py-1 bg-white shadow-lg rounded-lg w-full max-w-xs transition-transform transform hover:scale-105 hover:shadow-2xl">
            {/* Label avec un style décoré */}
            <div className="flex gap-2 text-blue-700 items-center py-2">
                <FileText className="w-4 h-4" />
                {label && (
                    <div className="font-semibold text-md uppercase tracking-wider">
                        {label}
                    </div>
                )}
            </div>
            {/* Titre du fichier */}
            <div className="text-sm font-medium text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap" style={{ maxWidth: "200px" }}>
                {title}
            </div>
        </div>
    );
};

export default DocCard;
