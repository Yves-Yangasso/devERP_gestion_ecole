<?php
namespace App\Http\Requests\Certifications;

use Illuminate\Foundation\Http\FormRequest;

class StoreCertificationRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'nom' => 'required|string|max:255|unique:certifications,nom',
            'description' => 'nullable|string|max:500',
        ];
    }
}
