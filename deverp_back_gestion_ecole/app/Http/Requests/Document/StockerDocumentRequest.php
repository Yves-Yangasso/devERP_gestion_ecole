<?php

namespace App\Http\Requests\Document;

use Illuminate\Foundation\Http\FormRequest;

class StockerDocumentRequest extends FormRequest
{
    public function rules()
    {
        return [
            'dossier_id' => 'required|exists:dossiers,id',
            'type_document' => 'required|string|max:255',
            'chemin_fichier' => 'required|file|mimes:pdf,jpg,png'
        ];
    }
}
