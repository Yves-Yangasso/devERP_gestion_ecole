<?php
namespace App\Http\Requests\Paiement;

use Illuminate\Foundation\Http\FormRequest;

class CreerPaiementRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'montant_paiement' => 'required|numeric|min:0',
            'inscription_id' => 'required|exists:inscriptions,id',
            'mode_paiement_id' => 'required|exists:mode_paiements,id',
            'lignes_paiement' => 'required|array',
            'lignes_paiement.*.montant' => 'required|numeric|min:0',
        ];
    }
}
