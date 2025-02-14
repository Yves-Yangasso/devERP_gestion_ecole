import { ChevronDown } from "lucide-react";

function UserButton({ name, role, profile }) {
    return (
        <button className="flex items-center gap-3 bg-[#F0ECEC] rounded-full border h-full pr-3 py-1 hover:bg-gray-200 transition-all">
            <img
                src={profile}
                alt="Profile"
                className="w-12 h-full rounded-full border-2 border-[#4A76C2]"
            />
            <div>
                <div className="font-medium">{name}</div>
                <div className="text-sm text-gray-500">{role}</div>
            </div>
            <ChevronDown size={20} className="text-gray-400" />
        </button>
    );
}

export default UserButton