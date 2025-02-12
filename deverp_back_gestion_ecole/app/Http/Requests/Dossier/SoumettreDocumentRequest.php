<?php

namespace App\Http\Requests\Dossier;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\Dossier\TypeDocument;

class SoumettreDocumentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type' => ['required', 'string', 'in:' . implode(',', array_column(TypeDocument::cases(), 'value'))],
            'fichier' => ['required', 'file', 'max:10240', 'mimes:pdf,jpg,jpeg,png'],
            'commentaire' => ['nullable', 'string', 'max:250'],
        ];
    }

    public function messages(): array
    {
        return [
            'type.required' => 'Le type de document est requis',
            'type.in' => 'Le type de document spécifié n\'est pas valide',
            'fichier.required' => 'Le fichier est requis',
            'fichier.file' => 'Le document doit être un fichier valide',
            'fichier.max' => 'La taille du fichier ne doit pas dépasser 10 Mo',
            'fichier.mimes' => 'Le fichier doit être au format PDF, JPG, JPEG ou PNG',
        ];
    }
}