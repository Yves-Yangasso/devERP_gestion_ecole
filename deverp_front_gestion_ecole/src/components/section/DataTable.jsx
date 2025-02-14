import React, { useState } from "react";
import TableRow from "../ui/Table/TableRow";

export default function DataTable({ columns, data, actions, onActionSelect }) {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="overflow-x-auto flex">
            <div className="w-full h-full shadow-md">
                <table className="w-full rounded-xl overflow-hidden">
                    <thead className="bg-[#345489] text-white rounded-xl">
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key} className="p-4 text-left font-medium">
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((row, index) => (
                                <TableRow key={index} row={row} columns={columns} index={index} openIndex={openIndex} setOpenIndex={setOpenIndex} actions={actions} onActionSelect={onActionSelect} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                                    Aucune donnée disponible
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
