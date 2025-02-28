<?php
namespace App\Http\Requests\Cours;

use Illuminate\Foundation\Http\FormRequest;

class StoreCoursRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'nom' => 'required|string|max:255',
            'code' => 'required|string|max:10|unique:cours,code',
            'credits' => 'required|integer|min:1',
            'volume_horaire' => 'required|integer|min:1',
        ];
    }
}
