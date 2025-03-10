<?php
namespace App\Http\Requests\Etudiant;

use Illuminate\Foundation\Http\FormRequest;

class CreerEtudiantRequest extends FormRequest {
    public function rules() {
        return [
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email',
            'inscription_id' => 'required|exists:inscriptions,id',
        ];
    }
}
