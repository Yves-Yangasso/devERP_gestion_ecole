import React from 'react';

const RightSection = ({ stepIndicator, formComponent }) => {
    return (
        <div className="w-1/2 bg-white bg-opacity-85 min-h-screen shadow-2xl flex flex-col justify-center items-center">
            <div className="h-full w-full flex flex-col px-12 py-8">
                {stepIndicator}
                {formComponent}
            </div>
        </div>
    );
}

export default RightSection;
