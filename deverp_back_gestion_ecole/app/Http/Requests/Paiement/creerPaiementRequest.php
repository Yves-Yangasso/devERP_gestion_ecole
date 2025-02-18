<?php
namespace App\Http\Requests\Paiement;

use Illuminate\Foundation\Http\FormRequest;

class creerPaiementRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'montant_paiement' => 'sometimes|numeric|min:0',
            'etudiant_id' => 'sometimes|exists:etudiants,id',
            'mode_paiement_id' => 'sometimes|exists:mode_paiements,id',
            'lignes_paiement' => 'sometimes|array',
            'lignes_paiement.*.montant' => 'sometimes|numeric|min:0',
        ];
    }
}
