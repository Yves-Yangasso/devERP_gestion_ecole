<?php
namespace App\Http\Requests\Departement;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDepartementRequest extends FormRequest {
    public function authorize() {
        return true;
    }

    public function rules() {
        $id = $this->route('departement'); // Assure-toi que le paramètre de la route est bien 'departement'

        return [
            'nom' => 'sometimes|string|max:255,' . ($id ?? 'NULL'),
            'code' => 'sometimes|string|max:255,' . ($id ?? 'NULL'),
            'description' => 'nullable|string',
        ];
    }
}
