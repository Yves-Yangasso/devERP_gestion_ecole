import React from "react";

const CardInfos = ({ tuteur }) => {
    return (
        <table className="text-start w-full border-collapse">
            <tbody>
                {Object.entries(tuteur).map(([key, value]) => (
                    <tr key={key} className="flex justify-between">
                        <td className="">{key}</td>
                        <td className="">{value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CardInfos;
