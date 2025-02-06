<?php

namespace App\Http\Requests\Document;

use Illuminate\Foundation\Http\FormRequest;

class ModifierDocumentRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Ajustez selon votre politique d'autorisation
    }

    public function rules()
    {
        return [
            'statut' => 'in:en_attente,valide,rejete',
            'date_expiration' => 'nullable|date|after:today'
        ];
    }

    public function messages()
    {
        return [
            'statut.in' => 'Le statut est invalide.',
            'date_expiration.after' => 'La date d\'expiration doit être postérieure à aujourd\'hui.'
        ];
    }
}