import React from 'react';

const DocCard = ({ title }) => {
    return (
        <div className="bg-white py-2 px-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-800">{title}</span>
            </div>
        </div>
    );

};

export default DocCard