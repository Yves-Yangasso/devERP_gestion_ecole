import { Download } from "lucide-react";

function DownloadButton() {
    return (
        <button className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-800">
            Télécharger la liste
            <Download className="w-5 h-5" />
        </button>
    );
}

export default DownloadButton;
