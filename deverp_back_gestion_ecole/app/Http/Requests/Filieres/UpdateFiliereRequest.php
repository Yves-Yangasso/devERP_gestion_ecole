<?php
namespace App\Http\Requests\Filieres;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFiliereRequest extends FormRequest {
    public function authorize() {
        return true;
    }

    public function rules() {
        $id = $this->route('filiere'); // Vérifie que c'est bien "filiere" dans la route
        $id = is_numeric($id) ? (int) $id : null; // Forcer à un entier ou NULL

        return [
            'nom' => 'sometimes|string|max:255|unique:filieres,nom,' . ($id ?? 'NULL') . ',id',
            'code' => 'sometimes|string|max:255|unique:filieres,code,' . ($id ?? 'NULL') . ',id',
            'departement_id' => 'sometimes|exists:departements,id',
            'description' => 'nullable|string|max:500',
            'est_professionnelle' => 'required|boolean',
        ];
    }
}
