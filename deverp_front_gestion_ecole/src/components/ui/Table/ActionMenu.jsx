import React, { useEffect } from "react";

export default function ActionMenu({ position, setOpenIndex, actions, onActionSelect }) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (!event.target.closest(".action-menu")) {
                setOpenIndex(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setOpenIndex]);

    return (
        <div
            className="fixed w-40 bg-white shadow-lg rounded-lg border z-50 action-menu"
            style={{
                top: `${position.top}px`,
                left: `${position.left - 150}px`,
                transform: `translateY(-100%)`
            }}
        >
            {actions.map((action, index) => (
                <button
                    key={index}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                        onActionSelect(action);
                        setOpenIndex(null);
                    }}
                >
                    {action}
                </button>
            ))}

        </div>
    );
}
