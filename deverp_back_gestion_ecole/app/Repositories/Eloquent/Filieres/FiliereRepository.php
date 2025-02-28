<?php
namespace App\Repositories\Eloquent\Filieres;

use App\Models\Filiere;
use App\Contracts\Repositories\Filieres\FiliereRepositoryInterface;

class FiliereRepository implements FiliereRepositoryInterface
{
    public function getAll()
    {
        return Filiere::all();
    }

    public function findById($id)
    {
        return Filiere::findOrFail($id);
    }

    public function create(array $data)
    {
        return Filiere::create($data);
    }

    public function update($id, array $data)
    {
        $filiere = Filiere::findOrFail($id);
        $filiere->update($data);
        return $filiere;
    }

    public function delete($id)
    {
        return Filiere::destroy($id);
    }
}
