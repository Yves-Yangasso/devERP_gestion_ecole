<?php

namespace App\Http\Requests\Etudiant;

use Illuminate\Foundation\Http\FormRequest;

class InscrireEtudiantRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'etudiant.prenom' => 'required|string|max:255',
            'etudiant.nom' => 'required|string|max:255',
            'etudiant.date_naissance' => 'required|date',
            'etudiant.lieu_naissance' => 'required|string|max:255',
            'etudiant.adresse' => 'required|string|max:255',
            'etudiant.telephone' => 'required|string|max:20',
            'etudiant.email' => 'required|email|unique:inscriptions,email',
            'etudiant.nationalite' => 'required|string|max:100',
            'etudiant.dernier_etablissement' => 'nullable|string|max:255',
            'etudiant.niveau' => 'required|string|max:100',
            'etudiant.formation_superieure' => 'nullable|string|max:255',
            'etudiant.specialites' => 'nullable|string|max:255',

            // 🔹 Validation des tuteurs (si fournis)
            'tuteurs' => 'nullable|array',
            'tuteurs.*.nom' => 'required|string|max:255',
            'tuteurs.*.prenom' => 'required|string|max:255',
            'tuteurs.*.telephone' => 'required|string|max:20',
            'tuteurs.*.email' => 'nullable|email|unique:tuteurs,email',

            // 🔹 Validation des documents (si fournis)
            'documents' => 'nullable|array',
            'documents.*.type_document' => 'required|string|max:255',
            'documents.*.chemin_fichier' => 'required|string|max:255',
        ];
    }
}
