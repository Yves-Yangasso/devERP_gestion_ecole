<?php
namespace App\Http\Requests\Modalite;

use Illuminate\Foundation\Http\FormRequest;

class StoreModaliteRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'type' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
        ];
    }
}
