<?php

namespace App\Http\Requests\Paiement;

use Illuminate\Foundation\Http\FormRequest;

class creerModePaiementRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'typemode' => 'required|string|unique:mode_paiements,typemode,' . ($this->route('id') ?? 'NULL'),
            'status' => 'required|string|max:50',
        ];
    }
}
