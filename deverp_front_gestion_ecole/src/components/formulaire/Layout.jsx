import React from 'react';

const Layout = ({ leftText, formComponent, StepIndicator }) => {
    return (
        <div 
            className="relative min-h-screen flex bg-center bg-cover"
            style={{
                backgroundImage: 'url("https://suptech.info/sup1/public/template/assets/img/banner/425345739_902874121534077_4802009755757595986_n.jpg")',
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute top-0 left-0 w-full h-full bg-blue-400 bg-opacity-70"></div>

            <div className="relative flex w-full flex-col md:flex-row">
                
                {/* Left Section */}
                <div className="hidden md:flex flex-1 flex-col p-6 sm:p-12"> {/* Hide on small screens */}
                    <div className="mb-auto">
                        <img
                            src="https://suptech.info/sup1/public/template/assets/img/isi.png"
                            alt="ISI SUPTECH"
                            className="w-28 h-auto mx-auto" // Center the image
                        />
                    </div>
                    <div className="flex-1 flex justify-center items-center mt-8">
                        <p className="text-lg sm:text-xl font-semibold text-white text-center leading-relaxed max-w-2xl mx-auto">
                            {leftText}
                        </p>
                    </div>
                </div>

                {/* Right Section (Form) */}
                <div className="w-full md:w-1/2 bg-white shadow-2xl flex flex-col justify-center items-center">
                    <div className="h-screen w-full flex flex-col px-6 sm:px-12 py-8 overflow-y-auto custom-scrollbar">
                        {StepIndicator}
                        {formComponent}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;