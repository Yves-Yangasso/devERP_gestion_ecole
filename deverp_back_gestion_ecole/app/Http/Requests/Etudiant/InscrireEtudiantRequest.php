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

            'tuteurs' => 'required|array|min:1',
            'tuteurs.*.nom' => 'required|string|max:255',
            'tuteurs.*.prenom' => 'required|string|max:255',
            'tuteurs.*.telephone' => 'required|string|max:20',
            'tuteurs.*.email' => 'required|email|unique:tuteurs,email',
            'tuteurs.*.adresse' => 'required|string|max:255',
            'tuteurs.*.fonctions' => 'required|string|max:255',
            'tuteurs.*.status' => 'required|string|max:255',

            'dossier.titre' => 'required|string|max:255',
            'dossier.description' => 'required|string',
            'dossier.documents' => 'required|array|min:1',
            'dossier.documents.*.type_document' => 'required|string|max:255',
            'dossier.documents.*.chemin_fichier' => 'required|string|max:255',
        ];
    }

    public function messages()
    {
        return [
            'etudiant.prenom.required' => 'Le prénom est requis',
            'etudiant.nom.required' => 'Le nom est requis',
            'etudiant.date_naissance.required' => 'La date de naissance est requise',
            'etudiant.lieu_naissance.required' => 'Le lieu de naissance est requis',
            'etudiant.adresse.required' => 'L\'adresse est requise',
            'etudiant.telephone.required' => 'Le numéro de téléphone est requis',
            'etudiant.email.required' => 'L\'email est requis',
            'etudiant.email.unique' => 'Cet email est déjà utilisé',
            'etudiant.nationalite.required' => 'La nationalité est requise',
            'etudiant.niveau.required' => 'Le niveau d\'études est requis',
        ];
    }
}
