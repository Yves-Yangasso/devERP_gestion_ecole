<?php

namespace App\Http\Requests\Paiement;

use App\Models\LignePaiement;
use App\Models\Paiement;
use Illuminate\Foundation\Http\FormRequest;

class CreerLignePaiementRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'paiement_id' => 'required|integer|exists:paiements,id',
            'mode_paiement_id' => 'required|integer|exists:mode_paiements,id',
            'montant' => ['required', 'numeric', 'min:0', function ($attribute, $value, $fail) {
                $paiement = Paiement::find($this->paiement_id);
                if ($paiement) {
                    $totalMontantLignes = LignePaiement::where('paiement_id', $paiement->id)->sum('montant');
                    if (($totalMontantLignes + $value) > $paiement->montant_paie) {
                        $fail('Le montant total des lignes de paiement ne peut pas dépasser le montant du paiement.');
                    }
                }
            }],
            'date_paiement' => 'required|date_format:Y-m-d H:i:s',
            'status' => 'required|string|in:en_attente,valide,annule',
        ];
    }
}



