<?php
namespace App\Http\Requests\Departement;

use Illuminate\Foundation\Http\FormRequest;

class StoreDepartementRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'nom' => 'required|string|max:255|unique:departements,nom',
            'description' => 'nullable|string|max:500',
            'code' => 'required|string|max:500',
        ];
    }
}
