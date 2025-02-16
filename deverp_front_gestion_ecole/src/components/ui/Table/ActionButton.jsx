import React, { useRef } from "react";
import { MoreHorizontal } from "lucide-react";
import ActionMenu from "./ActionMenu";

export default function ActionButton({ index, openIndex, setOpenIndex, actions, onActionSelect }) {
    const buttonRef = useRef(null);

    const handleClick = () => {
        const rect = buttonRef.current.getBoundingClientRect();
        setOpenIndex(openIndex?.index === index ? null : { index, top: rect.top, left: rect.right });
    };

    return (
        <>
            <button ref={buttonRef} onClick={handleClick} className="hover:bg-gray-100 rounded-full border shadow px-2">
                <MoreHorizontal size={20} className="text-orange-500" />
            </button>
            {openIndex?.index === index && <ActionMenu position={openIndex} onActionSelect={onActionSelect} setOpenIndex={setOpenIndex} actions={actions} />}
        </>
    );
}
