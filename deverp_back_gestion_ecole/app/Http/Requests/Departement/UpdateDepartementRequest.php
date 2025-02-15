<?php
namespace App\Http\Requests\Departement;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDepartementRequest extends FormRequest {
    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            'nom_departement' => 'sometimes|string|max:255|unique:departements,nom_departement,' . $this->route('departement'),
            'description' => 'nullable|string',
        ];
    }
}
