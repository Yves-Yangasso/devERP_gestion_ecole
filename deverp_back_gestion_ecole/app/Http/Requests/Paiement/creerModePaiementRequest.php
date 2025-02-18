<?php

namespace App\Http\Requests\Paiement;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\Tuteur\ModePaiementEnums;

class CreerModePaiementRequest extends FormRequest
{
    public function rules()
    {
        return [
            'typeMode' => 'required|string|max:100',
        ];
    }
}
