<?php

namespace App\Http\Requests\Dossier;

use Illuminate\Foundation\Http\FormRequest;

class CreerDossierRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // À adapter selon votre logique d'autorisation
    }

    public function rules(): array
    {
        return [
            'etudiant_id' => ['required', 'integer', 'exists:etudiants,id'],
            'commentaire' => ['nullable', 'string', 'max:500'],
            'mode_validation' => ['nullable', 'string', 'in:manuel,automatique'],
        ];
    }
}
