import React from 'react';

const Card = ({ icon, title, value, percentage, description }) => {
    return (
        <div className="stat-card rounded-lg p-4 sm:p-6 text-white bg-blue-600 shadow-lg">
            <div className="flex items-center mb-2 sm:mb-4">
                <div className="stat-icon w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                    {icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
            </div>
            <p className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">{value}</p>
            <div className="flex items-center text-xs sm:text-sm">
                <i className="fas fa-arrow-up mr-1 text-green-400"></i>
                <span className="text-green-400">{percentage}</span>
                <span className="ml-2 text-gray-300">{description}</span>
            </div>
        </div>

    );
};

export default Card;
