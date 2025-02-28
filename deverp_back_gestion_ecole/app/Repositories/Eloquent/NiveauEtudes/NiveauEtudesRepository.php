<?php
namespace App\Repositories\Eloquent\NiveauEtudes;

use App\Models\NiveauEtudes;
use App\Contracts\Repositories\NiveauEtudes\NiveauEtudesRepositoryInterface;

class NiveauEtudesRepository implements NiveauEtudesRepositoryInterface
{
    public function getAll()
    {
        return NiveauEtudes::all();
    }

    public function findById($id)
    {
        return NiveauEtudes::findOrFail($id);
    }

    public function create(array $data)
    {
        return NiveauEtudes::create($data);
    }

    public function update($id, array $data)
    {
        $niveau = NiveauEtudes::findOrFail($id);
        $niveau->update($data);
        return $niveau;
    }

    public function delete($id)
    {
        return NiveauEtudes::destroy($id);
    }
}
