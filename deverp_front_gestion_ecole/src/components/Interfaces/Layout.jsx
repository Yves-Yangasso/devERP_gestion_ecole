import React from 'react';
import LeftSection from './LeftSection';
import RightSection from './RightSection';

const Layout = ({ leftText, formComponent, StepIndicator }) => {
  return (
    <div 
      className="relative min-h-screen flex bg-center bg-cover"
      style={{
        backgroundImage: 'url("https://suptech.info/sup1/public/template/assets/img/banner/425345739_902874121534077_4802009755757595986_n.jpg")'
      }}
    >
      {/* Arrière-plan avec overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-blue-400 bg-opacity-70"></div>

      {/* Contenu principal */}
      <div className="relative flex w-full">
        <LeftSection text={leftText} />
        <RightSection stepIndicator={StepIndicator} formComponent={formComponent} />
      </div>
    </div>
  );
}

export default Layout;
