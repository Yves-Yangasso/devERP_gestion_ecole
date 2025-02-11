<?php

namespace App\Repositories\Eloquent;

use App\Models\Inscription;

class InscriptionRepository
{
    public function create(array $data)
    {
        return Inscription::create($data);
    }

    public function getAll()
    {
        return Inscription::all();
    }

    public function getById($id)
    {
        return Inscription::findOrFail($id);
    }
}
