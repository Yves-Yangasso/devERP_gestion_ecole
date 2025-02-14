import { Download } from "lucide-react";

function DownloadButton() {
    return (
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#2a3547] text-white rounded-md hover:bg-[#222a37]">
            Télécharger la liste
            <Download size={20} />
        </button>
    );
}

export default DownloadButton;
