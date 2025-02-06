<?php

namespace App\Http\Requests\Document;

use Illuminate\Foundation\Http\FormRequest;

class StockerDocumentRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Ajustez selon votre politique d'autorisation
    }

    public function rules()
    {
        return [
            'etudiant_id' => 'required|exists:etudiants,id',
            'type_document_id' => 'required|exists:types_documents,id',
            'fichier' => 'required|file|max:10240', // 10 Mo max
            'date_expiration' => 'nullable|date|after:today'
        ];
    }

    public function messages()
    {
        return [
            'fichier.max' => 'Le fichier ne doit pas dépasser 10 Mo.',
            'date_expiration.after' => 'La date d\'expiration doit être postérieure à aujourd\'hui.'
        ];
    }
}