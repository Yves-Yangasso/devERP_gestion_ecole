import React from 'react';

const Layout = ({ leftText, formComponent, StepIndicator }) => {
    return (
        <div className="relative min-h-screen flex bg-center bg-cover"
            style={{
                backgroundImage: 'url("https://suptech.info/sup1/public/template/assets/img/banner/425345739_902874121534077_4802009755757595986_n.jpg")'
            }}
        >
            {/* Arrière-plan avec overlay */}
            <div
                className="absolute top-0 left-0 w-full h-full bg-blue-400 bg-opacity-70"
            >
            </div>

            {/* Contenu */}
            <div className="relative flex w-full">
                {/* Section gauche */}
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
                            {leftText}
                        </p>
                    </div>
                </div>

                {/* Section droite */}
                <div className="w-1/2 bg-white bg-opacity-85 min-h-screen shadow-2xl flex flex-col justify-center items-center">
                    <div className="h-full w-full flex flex-col">
                        {StepIndicator}
                        {formComponent}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;
