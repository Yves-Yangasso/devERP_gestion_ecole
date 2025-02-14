// PopupLayout.js
import React from 'react';
import NavigationButtons from '../ui/Button/NavigationButtons';
import PopupHeader from '../ui/Button/PopupHeader';
import NavigationTabs from '../ui/Button/NavigationTabs';

// Composant principal du popup modifié
const PopupLayout = ({ 
  title, 
  activeTab, 
  tabs, 
  children, 
  onClose,
  onPrevClick,
  onNextClick,
  prevText,
  nextText,
  buttonType
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 flex flex-col min-h-[600px]">
        <PopupHeader title={title} onClose={onClose} />
        <NavigationTabs activeTab={activeTab} tabs={tabs} />
        <div className="flex-1 p-4">
          {children}
        </div>
        <NavigationButtons 
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          prevText={prevText}
          nextText={nextText}
          buttonType={buttonType}
        />
      </div>
    </div>
  );
};

export default PopupLayout; // Export du composant
