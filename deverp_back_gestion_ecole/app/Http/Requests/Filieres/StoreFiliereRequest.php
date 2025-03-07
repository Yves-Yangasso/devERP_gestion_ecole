<?php
namespace App\Http\Requests\Filieres;

use Illuminate\Foundation\Http\FormRequest;

class StoreFiliereRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'nom' => 'required|string|max:255|unique:filieres,nom',
            'code' => 'required|string|max:255|unique:filieres,code',
            'departement_id' => 'required|exists:departements,id',
            'description' => 'nullable|string|max:500',
            'est_professionnelle'=> 'required|boolean',
        ];
    }
}
