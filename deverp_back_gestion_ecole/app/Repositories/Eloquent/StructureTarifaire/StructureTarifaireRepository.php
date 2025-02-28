<?php
namespace App\Repositories\Eloquent\StructureTarifaire;

use App\Contracts\Repositories\StructureTarifaire\StructureTarifaireRepositoryInterface;
use App\Models\StructureTarifaire;

class StructureTarifaireRepository implements StructureTarifaireRepositoryInterface
{
    public function getAll()
    {
        return StructureTarifaire::all();
    }

    public function findById($id)
    {
        return StructureTarifaire::findOrFail($id);
    }

    public function create(array $data)
    {
        return StructureTarifaire::create($data);
    }

    public function update($id, array $data)
    {
        $structureTarifaire = StructureTarifaire::findOrFail($id);
        $structureTarifaire->update($data);
        return $structureTarifaire;
    }

    public function delete($id)
    {
        $structureTarifaire = StructureTarifaire::findOrFail($id);
        return $structureTarifaire->delete();
    }
}
