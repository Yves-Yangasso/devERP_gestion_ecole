import React from "react";
import CardInfos from "./CardInfos";

const TuteurInfos = ({ tuteur, number }) => {
  return (
    <div className=" max-w-md">
      <h2 className="text-sm text-start font-bold mb-2">Tuteur {number}</h2>
      <CardInfos tuteur={tuteur}/>
    </div>
  );
};

export default TuteurInfos;
