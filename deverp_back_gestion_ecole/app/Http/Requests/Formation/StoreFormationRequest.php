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
            'filiere_id' => 'required|integer|exists:filieres,id',
            'niveau_id' => 'required|integer|exists:niveau_etudes,id',
            'est_en_ligne' => 'required|boolean',
        ];
    }
}
