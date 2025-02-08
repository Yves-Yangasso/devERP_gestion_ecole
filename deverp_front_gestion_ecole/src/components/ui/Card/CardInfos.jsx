import React from "react";

const CardInfos = ({ tuteur }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left table-auto border-separate border-spacing-2">
        <tbody>
          {Object.entries(tuteur).map(([key, value], index) => (
            <tr
              key={index}
              className={`border-b border-gray-200 hover:bg-gray-100 transition-all duration-200`}
            >
              <td className="p-2 text-sm text-gray-600 font-medium">{key}</td>
              <td className="p-2 text-sm text-gray-600">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CardInfos;
