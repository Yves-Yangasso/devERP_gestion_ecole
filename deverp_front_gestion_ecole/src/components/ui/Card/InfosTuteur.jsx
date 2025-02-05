import { Users } from "lucide-react";
import Title from "../DocText/Title";
import TuteurInfos from "./TuteurInfos";

const InfosTuteur = ({tuteurs}) => {
    
    return (
        <div className="bg-white w-1/2 space-y-2 p-4 rounded-xl shadow-md">
        <Title icon={Users} title={"Informations Tuteur(s)"}/>
        {tuteurs.map((tuteur, index) => (
          <TuteurInfos key={index} tuteur={tuteur} number={index + 1} />
        ))}
      </div>
    );
  };
  
  export default InfosTuteur;