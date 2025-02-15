<?php

namespace App\Http\Requests\Document;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTypeDocumentRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'nom_type_document' => 'sometimes|required|string|max:255',
            'description_type_document' => 'nullable|string',
        ];
    }
}
