import React, { useState, useEffect } from 'react';
import { Upload, X, File } from 'lucide-react';
import clsx from 'clsx';
import { validateFile } from '../../../utils/validators'; // Ou le chemin correct

const FileInput = ({
  label,
  name,
  accept,
  onChange,
  className,
  initialFile = null, // Cette propriété permet de passer un fichier initial depuis le parent
  ...rest
}) => {
  const [selectedFile, setSelectedFile] = useState(initialFile);
  const [error, setError] = useState(null);

  // Effect pour initialiser le fichier sélectionné
  useEffect(() => {
    if (initialFile) {
      setSelectedFile(initialFile);
    }
  }, [initialFile]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      const errorMessage = validateFile(file);
      if (errorMessage) {
        setError(errorMessage); // Affiche l'erreur
        setSelectedFile(null);  // Réinitialise le fichier sélectionné
        return;
      }

      setError(null); // Pas d'erreur, on valide le fichier
      setSelectedFile(file);
      if (onChange) {
        onChange(e);
      }
    }
  };

  const handleRemoveFile = (e) => {
    e.preventDefault();  // Empêcher la propagation de l'événement
    setSelectedFile(null);

    // Réinitialiser la valeur de l'input file
    const input = document.querySelector(`input[name="${name}"]`);
    if (input) {
      input.value = '';
    }
    if (onChange) {
      // Créer un événement synthétique pour maintenir la cohérence
      const syntheticEvent = {
        target: { name, value: null, files: [] },
        preventDefault: () => {}
      };
      onChange(syntheticEvent);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        name={name}
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        id={`file-${name}`}
        {...rest}
      />
      {!selectedFile ? (
        <label
          htmlFor={`file-${name}`}
          className={clsx(
            "flex items-center justify-center w-full p-3 border-2 border-dashed",
            "rounded-lg cursor-pointer transition-all duration-200",
            "hover:border-blue-500 hover:bg-blue-50",
            selectedFile ? "border-green-500 bg-green-50" : "border-gray-300",
            className
          )}
        >
          <div className="flex items-center gap-4">
            <Upload className="w-6 h-6 text-gray-400" />
            <span className="text-sm text-gray-500">
              {label || "Choisir un fichier"}
            </span>
          </div>
        </label>
      ) : (
        <div className="flex items-center justify-between w-full p-3 border-2 border-green-500 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2">
            <File className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-700 truncate max-w-[200px]">
              {selectedFile.name}
            </span>
          </div>
          <button
            type="button"
            onClick={handleRemoveFile}
            className="p-1 hover:bg-green-100 rounded-full transition-colors"
            title="Supprimer le fichier"
          >
            <X className="w-5 h-5 text-green-600" />
          </button>
        </div>
      )}
      {error && (
        <div className="text-red-500 text-sm mt-1">
          {error}
        </div>
      )}
    </div>
  );
};

export default FileInput;
