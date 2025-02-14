<?php

namespace App\Http\Requests\Tuteur;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\Tuteur\StatutTuteur;

class CreerTuteurRequest extends FormRequest
{
    public function rules()
    {
        return [
            'prenom' => 'required|string|max:100',
            'nom' => 'required|string|max:100',
            'email' => 'required|email|unique:tuteurs,email',
            'telephone' => 'required|string|max:20',
            'adresse' => 'nullable|string|max:255',
            'fonctions' => 'nullable|string|max:100',
            'statut' => 'in:'.implode(',', array_column(StatutTuteur::cases(), 'value'))
        ];
    }
}
