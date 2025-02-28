<?php
namespace App\Http\Requests\Filieres;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFiliereRequest extends FormRequest {
    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            'idepartement' => 'sometimes|exists:departement,id',
            'nom_filiere' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|in:active,inactive',
        ];
    }
}
