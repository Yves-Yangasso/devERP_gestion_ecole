<?php

namespace App\Http\Requests\Dossier;

use Illuminate\Foundation\Http\FormRequest;

class SuiviDossierRequest extends FormRequest
{
    public function rules()
    {
        return [
            'code_suivi' => 'required|string|size:6',
            'email' => 'required|email'
        ];
    }

    public function messages()
    {
        return [
            'code_suivi.required' => 'Le code de suivi est obligatoire',
            'code_suivi.size' => 'Le code de suivi doit contenir exactement 6 caractères',
            'email.required' => 'L\'adresse email est obligatoire',
            'email.email' => 'L\'adresse email n\'est pas valide'
        ];
    }
}
