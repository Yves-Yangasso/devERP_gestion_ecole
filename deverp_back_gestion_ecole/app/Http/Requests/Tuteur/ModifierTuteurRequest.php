<?php

namespace App\Http\Requests\Tuteur;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\Tuteur\StatutTuteur;

class ModifierTuteurRequest extends FormRequest
{
    public function rules()
    {
        $tuteurId = $this->route('id');

        return [
            'prenom' => 'sometimes|string|max:100',
            'nom' => 'sometimes|string|max:100',
            'email' => 'sometimes|email|unique:tuteurs,email,'.$tuteurId,
            'telephone' => 'sometimes|string|max:20',
            'adresse' => 'nullable|string|max:255',
            'fonctions' => 'nullable|string|max:100',
            'statut' => 'sometimes|in:'.implode(',', array_column(StatutTuteur::cases(), 'value'))
        ];
    }
}