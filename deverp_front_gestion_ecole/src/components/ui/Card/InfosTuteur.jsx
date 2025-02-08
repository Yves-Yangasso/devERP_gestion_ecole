import { Users } from "lucide-react";
import Title from "../DocText/Title";
import TuteurInfos from "./TuteurInfos";

const InfosTuteur = ({ tuteurs }) => {
  return (
    <div className="bg-white w-full md:w-1/2 space-y-4 p-6 rounded-xl shadow-xl transition-all transform hover:scale-105 hover:shadow-2xl">
      {/* Titre du bloc avec icône */}
      <Title icon={Users} title={"Informations Tuteur(s)"} />
      
      {/* Liste des tuteurs */}
      {tuteurs.map((tuteur, index) => (
        <TuteurInfos key={index} tuteur={tuteur} number={index + 1} />
      ))}
    </div>
  );
};

export default InfosTuteur;
