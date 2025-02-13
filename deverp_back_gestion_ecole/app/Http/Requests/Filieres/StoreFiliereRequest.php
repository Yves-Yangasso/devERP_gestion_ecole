<?php
namespace App\Http\Requests\Filieres;

use Illuminate\Foundation\Http\FormRequest;

class StoreFiliereRequest extends FormRequest {
    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            'idepartement' => 'required|exists:departements,id',
            'nom_filiere' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ];
    }
}
