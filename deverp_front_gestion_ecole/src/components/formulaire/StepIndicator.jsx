import React from 'react';

const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center w-full mb-12">
      {Array.from({ length: totalSteps }, (_, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div 
              className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${index + 1 <= currentStep 
                  ? 'bg-green-600 text-white border-2 border-white' 
                  : 'bg-white border-2 border-gray-300 text-gray-500'}
                font-semibold text-lg
              `}
            >
              {index + 1}
            </div>
          </div>
          {index < totalSteps - 1 && (
            <div 
              className={`
                h-[2px] flex-1 mx-4
                ${index + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-300'}
              `}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default StepIndicator;
