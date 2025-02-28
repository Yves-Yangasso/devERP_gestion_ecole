<?php
namespace App\Http\Requests\OptionFormation;

use Illuminate\Foundation\Http\FormRequest;

class StoreOptionFormationRequest extends FormRequest
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
        ];
    }
}
