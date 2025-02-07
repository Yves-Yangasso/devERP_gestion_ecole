import React, { useState } from "react";
import { Upload } from "lucide-react"; // Icône pour améliorer le design
import clsx from "clsx";

const FileInput = ({ label, name, accept, className, onChange, ...rest }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name); // Mettre à jour le nom du fichier
      if (onChange) onChange(e); // Appeler la fonction onChange passée en prop
    } else {
      setFileName("");
    }
  };

  const handleRemoveFile = () => {
    setFileName("");
    // Mettre à jour le parent si nécessaire
    if (onChange) onChange({ target: { name, value: "" } });
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className={clsx(
          "cursor-pointer w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700",
          "hover:bg-gray-100 active:bg-gray-200 transition-all duration-200",
          className
        )}
      >
        <Upload size={20} className="text-blue-500" />
        <span className="text-sm">Choisir un fichier</span>
      </label>

      <input
        id={name}
        name={name}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        {...rest}
      />

      {fileName && (
        <div className="flex items-center gap-2 mt-2">
          <span className="text-gray-600">{fileName}</span>
          <button
            type="button"
            onClick={handleRemoveFile}
            className="text-red-500"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default FileInput;
