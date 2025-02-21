import React, { useState } from "react";
import TableRow from "../ui/Table/TableRow";
import Pagination from "../ui/Pagination/pagination";

export default function DataTable({ columns, data, actions, onActionSelect }) {
    const [openIndex, setOpenIndex] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(10); // Nombre de lignes par défaut
    const [currentPage, setCurrentPage] = useState(1);  // Page actuelle

    // Calculer les données visibles
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

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
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row, index) => (
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
                <Pagination 
                    total={data.length} 
                    rowsPerPage={rowsPerPage} 
                    currentPage={currentPage} 
                    setCurrentPage={setCurrentPage}
                    setRowsPerPage={setRowsPerPage}
                />
            </div>
        </div>
    );
}
