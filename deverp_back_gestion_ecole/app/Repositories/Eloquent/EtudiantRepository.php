<?php
namespace App\Repositories\Eloquent;

use App\Contracts\Repositories\Etudiant\EtudiantRepositoryInterface;
use App\Models\Etudiant;

class EtudiantRepository implements EtudiantRepositoryInterface
{
    public function create(array $data)
    {
        return Etudiant::create($data);
    }

    public function findById($id)
    {
        return Etudiant::find($id);
    }

    public function getAll()
    {
        return Etudiant::all();
    }

    public function update($id, array $data)
    {
        return Etudiant::where('id', $id)->update($data);
    }

    public function delete($id)
    {
        return Etudiant::destroy($id);
    }
}

