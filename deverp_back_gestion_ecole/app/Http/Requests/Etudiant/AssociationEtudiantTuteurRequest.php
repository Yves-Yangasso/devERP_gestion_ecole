<?php

namespace App\Http\Requests\Etudiant;

use Illuminate\Foundation\Http\FormRequest;

class AssociationEtudiantTuteurRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'inscription_id' => 'required|exists:inscriptions,id',
            'tuteur_id' => 'required|exists:tuteurs,id',
        ];
    }
}
