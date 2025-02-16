import { User } from "lucide-react";
import Title from "../DocText/Title";
import CardInfos from "./CardInfos";

const StudentInfos = ({ demandeurs }) => {
  return (
    <div className="bg-white w-full md:w-1/2 space-y-4 p-6 rounded-xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl">
      {/* Titre du bloc avec icône */}
      <Title icon={User} title={"Informations Candidat"} />

      {/* Liste des demandeurs */}
      <CardInfos tuteur={demandeurs} />
    </div>
  );
};

export default StudentInfos;
