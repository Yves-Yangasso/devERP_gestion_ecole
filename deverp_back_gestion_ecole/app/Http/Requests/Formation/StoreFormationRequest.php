<?php
namespace App\Http\Requests\Formation;

use Illuminate\Foundation\Http\FormRequest;

class StoreFormationRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'duree' => 'required|integer|min:1',
            'niveau_entree' => 'required|string|max:255',
        ];
    }
}
