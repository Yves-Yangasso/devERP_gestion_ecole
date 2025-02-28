<?php
namespace App\Http\Requests\StructureTarifaire;

use Illuminate\Foundation\Http\FormRequest;

class StoreStructureTarifaireRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'formation_id' => 'required|exists:formations,id',
            'cout_annuel' => 'required|numeric|min:0',
            'droit_inscription' => 'required|numeric|min:0',
            'mensualite' => 'required|numeric|min:0',
            'annee_scolaire' => 'required|string|max:9', // Format attendu: "2024-2025"
        ];
    }
}
