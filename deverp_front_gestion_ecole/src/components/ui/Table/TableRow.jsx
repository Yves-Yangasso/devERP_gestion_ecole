import ActionButton from "./ActionButton";

export default function TableRow({ row, columns, index, openIndex, setOpenIndex, actions, onActionSelect, onRowClick }) {
    return (
        <tr 
            className="bg-white border-b last:border-none hover:bg-gray-50 rounded-xl cursor-pointer"
            onClick={() => onRowClick && onRowClick(row)}
        >
            {columns.map((col) => (
                <td key={col.key} className="px-4 py-2">
                    {col.key === "actions" ? (
                        <div onClick={(e) => e.stopPropagation()}>
                            <ActionButton 
                                index={index}
                                openIndex={openIndex}
                                setOpenIndex={setOpenIndex}
                                actions={actions}
                                onActionSelect={(action) => onActionSelect(action, row)}
                            />
                        </div>
                    ) : (
                        row[col.key] ?? "---"
                    )}
                </td>
            ))}
        </tr>
    );
}
