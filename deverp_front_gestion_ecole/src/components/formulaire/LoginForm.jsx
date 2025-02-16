/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const LoginForm = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className=" p-10 bg-white rounded-[25px] shadow-[8px_8px_0_-3px_blue] w-[380px] relative overflow-hidden">
        {/* Effet wave en haut à droite */}
        <div className="absolute top-0 right-0 w-[200px] h-[200px] opacity-10 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-full h-full"
            style={{
              background:
                "repeating-linear-gradient(45deg, transparent, transparent 10px, #0047AB 10px, #0047AB 11px)",
              transform: "rotate(-10deg)",
            }}
          ></div>
        </div>

        {/* Logo */}
        <div className="flex items-center mb-4">
          <img
            src="/images/Isi_Logo.png"
            alt="ISI SUPTECH"
            className="w-28 h-auto"
          />
        </div>

        {/* Texte de bienvenue */}
        <p className="text-sm mb-2">
          Bienvenue sur <span className="text-[#0047AB]">ISI SUPTECH</span>
        </p>

        {/* Titre */}
        <h2 className="text-2xl text-black mb-6 font-normal">Se connecter</h2>

        {/* Formulaire */}
        <form>
          <div className="mb-4">
            <label className="block mb-2 text-[#333] text-sm">
              Email Professionnel <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Entrez votre email professionnel"
              className="w-full p-3 border border-[#ddd] rounded-lg mb-4 text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-[#333] text-sm">
              Mot de passe <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Entrez votre mot de passe"
              className="w-full p-3 border border-[#ddd] rounded-lg mb-4 text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-[#0047AB] text-white rounded-lg cursor-pointer text-sm mt-4"
          >
            Se connecter
          </button>
          <div className="text-right mt-2">
            <a href="#" className="text-[#0047AB] no-underline text-xs">
              Mot de passe oublié ?
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm;