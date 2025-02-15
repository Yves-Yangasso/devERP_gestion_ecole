<?php

namespace App\Http\Requests\Dossier;

use App\Enums\Dossier\StatutDossier;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class ModifierDossierRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Vérifier si l'utilisateur a le droit de modifier ce dossier
        $dossier = $this->route('dossier');
        return $this->user()->can('update', $dossier);
    }

    public function rules(): array
    {
        return [
            'statut' => ['sometimes', 'required', new Enum(StatutDossier::class)],
            'commentaire' => ['sometimes', 'nullable', 'string', 'max:500'],
            'mode_validation' => ['sometimes', 'required', 'in:manuel,automatique'],
            'documents_a_supprimer' => ['sometimes', 'array'],
            'documents_a_supprimer.*' => ['required', 'exists:documents,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'statut.required' => 'Le statut du dossier est requis',
            'mode_validation.required' => 'Le mode de validation doit être spécifié',
            'mode_validation.in' => 'Le mode de validation doit être soit manuel soit automatique',
            'documents_a_supprimer.array' => 'La liste des documents à supprimer doit être un tableau',
            'documents_a_supprimer.*.exists' => 'Un des documents sélectionnés n\'existe pas',
        ];
    }

    public function attributes(): array
    {
        return [
            'statut' => 'statut du dossier',
            'commentaire' => 'commentaire',
            'mode_validation' => 'mode de validation',
            'documents_a_supprimer' => 'documents à supprimer',
        ];
    }
}