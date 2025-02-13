<?php

namespace App\Http\Requests\Dossier;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\Dossier\StatutDocument;
use Illuminate\Validation\Rules\Enum;

class TraiterDocumentRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'statut' => ['required', new Enum(StatutDocument::class)],
            'commentaire' => 'nullable|string|max:500',
            'motif_rejet' => 'required_if:statut,invalide|nullable|string|max:500',
            'validateur_id' => 'required|exists:users,id'
        ];
    }

    public function messages()
    {
        return [
            'statut.required' => 'Le statut du document est requis',
            'motif_rejet.required_if' => 'Le motif de rejet est requis lorsque le document est invalidé',
            'validateur_id.required' => 'L\'identifiant du validateur est requis'
        ];
    }
}
