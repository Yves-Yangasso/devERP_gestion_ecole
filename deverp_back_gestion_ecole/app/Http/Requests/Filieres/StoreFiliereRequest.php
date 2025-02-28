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
            'departement_id' => 'required|exists:departement,id',
            'description' => 'nullable|string|max:500',
        ];
    }
}
