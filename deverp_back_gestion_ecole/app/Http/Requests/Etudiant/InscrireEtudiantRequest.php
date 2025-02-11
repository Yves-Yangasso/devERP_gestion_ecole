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
            'prenom' => 'required|string|max:255',
            'nom' => 'required|string|max:255',
            'date_naissance' => 'required|date',
            'lieu_naissance' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
            'telephone' => 'required|string|max:20',
            'email' => 'required|email',
            'nationalite' => 'required|string|max:100',
            'dernier_etablissement' => 'nullable|string|max:255',
            'niveau' => 'required|string|max:100',
            'formation_superieure' => 'nullable|string|max:255',
            'specialites' => 'nullable|string|max:255',
            'id_tuteur'=>'integer',
        ];
    }
}
