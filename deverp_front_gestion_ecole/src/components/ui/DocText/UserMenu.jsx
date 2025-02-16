import { Bell } from "lucide-react";
import UserButton from "../Infos/UserButton";

function UserMenu({name, role}) {
    return (
        <div className="flex items-center gap-4 py-1">
            <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell size={20} />
            </button>

            <UserButton name={name} role={role} />
        </div>
    );
}

export default UserMenu