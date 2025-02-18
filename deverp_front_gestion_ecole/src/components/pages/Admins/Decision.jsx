import React from 'react';
import SimpleButton from '../../ui/Button/SimpleButton'; // Assure-toi du bon chemin pour importer SimpleButton
import SimpleLabel from '../../ui/label/SimpleLabel'; // Assure-toi du bon chemin pour SimpleLabel

const Decision = () => {
  return (
    <div
      className="relative min-h-screen flex bg-center bg-cover"
      style={{
        backgroundImage:
          'url("https://suptech.info/sup1/public/template/assets/img/banner/425345739_902874121534077_4802009755757595986_n.jpg")',
      }}
    >
      {/* Couche pour assombrir légèrement l'arrière-plan */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Conteneur principal */}
      <div className="relative z-10 flex items-center justify-center w-full">
        <div className="bg-white bg-opacity-90 p-10 rounded-lg shadow-lg w-full max-w-3xl">
          {/* Titre */}
          <h2 className="relative mx-auto text-2xl font-bold text-blue-600 mb-10 px-12 py-4 border-2 border-blue-600 rounded-tl-full rounded-br-full bg-white max-w-2xl text-center">
            DECISION
          </h2>

          {/* Formulaire */}
          <form>
            {/* Statut du dossier */}
            <div className="mb-8">
              <SimpleLabel
                text="Statut du dossier"
                className="block text-gray-700 font-medium text-lg"
              />
              <div className="relative">
                <select
                  id="statut"
                  className="block w-full border border-gray-400 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Veuillez saisir le statut du dossier</option>
                  <option value="approved">Approuvé</option>
                  <option value="rejected">Rejeté</option>
                </select>
              </div>
            </div>

            {/* Motif */}
            <div className="mb-8">
              <SimpleLabel
                text="Motif"
                className="block text-gray-700 font-medium text-lg"
              />
              <textarea
                id="motif"
                rows="6"
                className="block w-full border border-blue-500 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Veuillez saisir le motif ici..."
              ></textarea>
            </div>

            {/* Bouton Valider */}
            <div className="flex justify-center">
              <SimpleButton variant="primary">Valider</SimpleButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Decision;
