<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreerEtudiantRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'id_inscription' => 'required|integer',
            'matricule' => 'required|string|max:255',
            'date_inscription'=>'required|date'
        ];
    }
}