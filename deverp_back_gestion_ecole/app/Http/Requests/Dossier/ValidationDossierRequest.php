<?php

// app/Http/Requests/Dossier/ValidationDossierRequest.php
namespace App\Http\Requests\Dossier;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\Dossier\StatutDossier;
use App\Enums\Dossier\StatutDocument;
use Illuminate\Validation\Rules\Enum;

class ValidationDossierRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Ajustez selon vos besoins d'autorisation
    }

    public function rules()
    {
        return [
            'statut' => ['required', new Enum(StatutDossier::class)],
            'commentaire' => 'nullable|string|max:500',
            'documents' => 'array',
            'documents.*.id' => 'required|exists:documents,id',
            'documents.*.statut' => ['required', new Enum(StatutDocument::class)],
            'documents.*.commentaire' => 'nullable|string|max:255'
        ];
    }

    public function messages()
    {
        return [
            'statut.required' => 'Le statut du dossier est requis',
            'documents.*.id.exists' => 'Un ou plusieurs documents n\'existent pas',
            'documents.*.statut.required' => 'Le statut est requis pour chaque document'
        ];
    }
}