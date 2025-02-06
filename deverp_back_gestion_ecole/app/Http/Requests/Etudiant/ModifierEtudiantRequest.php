<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ModifierEtudiantRequest extends FormRequest{
    public function authorize(){
        return true;
    }

    public function rules(){
        return [
        'id_inscription' => 'required|integer',
        'matricule'=> 'required|string|max:255',
        ];

}

}