import React from 'react';
import { FileText } from 'lucide-react';

const Title = ({ title, icon: Icon }) => {
    const IconComponent = Icon || FileText;

    return (
        <div className="flex items-center gap-2 mb-6">
            <IconComponent className="h-6 w-6 text-blue-600"/>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>
    );
};

export default Title;