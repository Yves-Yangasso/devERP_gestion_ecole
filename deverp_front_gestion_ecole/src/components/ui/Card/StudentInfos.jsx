import { User } from "lucide-react";
import Title from "../DocText/Title";
import CardInfos from "./CardInfos";

const StudentInfos = ({demandeurs}) => {
    
    return (
        <div className="bg-white w-1/2 space-y-2 p-4 shadow-md rounded-xl">
        <Title icon={User} title={"Informations Candidat"}/>
          <CardInfos tuteur={demandeurs} />
      </div>
    );
  };
  
  export default StudentInfos;