<?php

namespace App\Http\Requests\Dossier;

use Illuminate\Foundation\Http\FormRequest;

class ValidateDossierRequests extends FormRequest
{
    public function rules()
    {
        return [
            'inscription_id' => 'required|exists:inscriptions,id',
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
        ];
    }
}
