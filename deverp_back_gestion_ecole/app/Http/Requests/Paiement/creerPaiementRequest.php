<?php

namespace App\Http\Requests\Paiement;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\Tuteur\ModePaiementEnums;

class CreePaiementRequest extends FormRequest
{
    public function rules()
    {
        return [
            'montant' => 'required|float',
            'id_mode' => 'required|integer',
        ];
    }
}
