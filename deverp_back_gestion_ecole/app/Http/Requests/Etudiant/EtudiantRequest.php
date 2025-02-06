<?php
// app/Http/Requests/Etudiant/InscrireEtudiantRequest.php

namespace App\Http\Requests\Etudiant;

use Illuminate\Foundation\Http\FormRequest;

class InscrireEtudiantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Informations de l'étudiant
            'nom' => ['required', 'string', 'max:100'],
            'prenom' => ['required', 'string', 'max:100'],
            'date_naissance' => ['required', 'date'],
            'lieu_naissance' => ['required', 'string', 'max:100'],
            'adresse' => ['required', 'string', 'max:255'],
            'telephone' => ['required', 'string', 'max:20'],
            'email' => ['required', 'email', 'unique:etudiants,email'],
            'cni' => ['required', 'string', 'unique:etudiants,cni'],

            // Informations du profil
            'niveau_etude' => ['required', 'string'],
            'dernier_etablissement' => ['required', 'string'],
            'annee_bac' => ['required', 'integer'],
            'serie_bac' => ['required', 'string'],
            'mention_bac' => ['required', 'string'],
            'numero_bac' => ['required', 'string', 'unique:profils_etudiant,numero_bac'],

            // Informations du tuteur
            'tuteur.nom' => ['required', 'string', 'max:100'],
            'tuteur.prenom' => ['required', 'string', 'max:100'],
            'tuteur.telephone' => ['required', 'string', 'max:20'],
            'tuteur.email' => ['required', 'email'],
            'tuteur.profession' => ['required', 'string', 'max:100']
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'Le champ :attribute est obligatoire',
            'email' => 'L\'adresse email n\'est pas valide',
            'unique' => 'Cette valeur est déjà utilisée',
            'max' => 'Le champ :attribute ne doit pas dépasser :max caractères',
            'cni.unique' => 'Ce numéro de CNI est déjà enregistré.',
            'telephone.unique' => 'Ce numéro de téléphone est déjà utilisé.',
            'email.unique' => 'Cette adresse email est déjà utilisée.',
            'numero_bac.unique' => 'Ce numéro de BAC est déjà utilisé.'
            // Ajout d'autres messages personnalisés pour les champs supplémentaires
        ];
    }
}
