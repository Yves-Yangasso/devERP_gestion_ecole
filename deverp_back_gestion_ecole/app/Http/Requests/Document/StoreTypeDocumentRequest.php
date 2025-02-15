<?php

namespace App\Http\Requests\Document;

use Illuminate\Foundation\Http\FormRequest;

class StoreTypeDocumentRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'nom_type_document' => 'required|string|max:255',
            'description_type_document' => 'nullable|string',
        ];
    }
}
