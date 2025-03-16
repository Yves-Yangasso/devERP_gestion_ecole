<?php

namespace App\Http\Requests\Etudiant;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
class InscrireEtudiantRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Autorise tous les utilisateurs
    }

    public function rules()
{
    return [
        'id_compte_user' => 'required|integer',
        'nom' => 'required|string|max:255',
        'prenom' => 'required|string|max:255',
        'mail' => 'required|email',
        'date_naissance' => 'required|date',
        'lieu_naissance' => 'required|string|max:255',
        'telephone' => 'required|string|max:255',
        'addresse' => 'required|string|max:255',
        'nationalite' => 'required|string|max:255',
        'dernier_etablissement' => 'required|string|max:255',
        'niveau' => 'required|string',
        'formation_superieur' => 'required|string',
        'id_specialite' => 'required|integer',
        'status_inscription' => 'required|string|in:en_cours,valider,rejeter',
    ];
}

}



// namespace App\Http\Requests\Etudiant;

// use Illuminate\Foundation\Http\FormRequest;
// use App\Rules\Etudiant\UniqueInscriptionRule;
// use App\Enums\Etudiant\StatutInscription;

// class InscrireEtudiantRequest extends FormRequest
// {
//     public function authorize()
//     {
//         return true;
//     }

//     public function rules()
//     {
//         return [
//             'etudiant_id' => [
//                 'required', 
//                 'exists:etudiants,id',
//                 new UniqueInscriptionRule($this->input('annee_academique'))
//             ],
//             'annee_academique' => [
//                 'required', 
//                 'string', 
//                 'regex:/^\d{4}-\d{4}$/'
//             ],
//             'statut' => [
//                 'required', 
//                 'in:' . implode(',', array_column(StatutInscription::cases(), 'value'))
//             ],
//             'date_inscription' => 'required|date',
//             'classe_id' => 'required|exists:classes,id'
//         ];
//     }

//     public function messages()
//     {
//         return [
//             'etudiant_id.required' => 'L\'identifiant de l\'étudiant est obligatoire',
//             'etudiant_id.exists' => 'L\'étudiant spécifié n\'existe pas',
//             'annee_academique.required' => 'L\'année académique est obligatoire',
//             'annee_academique.regex' => 'Le format de l\'année académique est invalide (ex: 2023-2024)',
//             'statut.required' => 'Le statut de l\'inscription est obligatoire',
//             'date_inscription.required' => 'La date d\'inscription est obligatoire',
//             'classe_id.required' => 'La classe est obligatoire'
//         ];
//     }
// }