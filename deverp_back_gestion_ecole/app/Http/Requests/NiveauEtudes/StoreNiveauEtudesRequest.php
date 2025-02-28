<?php
namespace App\Http\Requests\NiveauEtudes;

use Illuminate\Foundation\Http\FormRequest;

class StoreNiveauEtudesRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'code' => 'required|string|max:255|unique:niveau_etudes,code',
            'nom' => 'required|string|max:255|unique:niveau_etudes,nom',
            'nombre_semestres' => 'required|integer',
            'nombre_annees' => 'required|integer',
        ];
    }
}
