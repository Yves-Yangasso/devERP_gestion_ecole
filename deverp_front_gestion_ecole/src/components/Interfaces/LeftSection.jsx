import React from 'react';

const LeftSection = ({ text }) => {
  return (
    <div className="flex-1 flex flex-col p-12">
      <div className="mb-auto">
        <img
          src="https://suptech.info/sup1/public/template/assets/img/isi.png"
          alt="ISI SUPTECH"
          className="w-28 h-auto"
        />
      </div>
      <div className="flex-1 flex justify-center items-center mt-8">
        <p className="text-xl font-semibold text-white text-center leading-relaxed max-w-2xl mx-auto">
          {text}
        </p>
      </div>
    </div>
  );
}

export default LeftSection;
