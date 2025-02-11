<?php
// Request AssocierEtudiantRequest
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AssocierEtudiantRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'etudiants' => 'required|array',
            'etudiants.*' => 'exists:etudiants,id'
        ];
    }
}